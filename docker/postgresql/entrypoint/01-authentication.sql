-- "authenticator" role for postgrest
CREATE ROLE authenticator LOGIN NOINHERIT;

-- "anon" role for postgrest
CREATE ROLE anon NOLOGIN NOINHERIT;
ALTER ROLE anon SET statement_timeout = '5s';
GRANT USAGE ON SCHEMA public TO anon; -- schema-level permissions
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon; -- grant for table-level, rls for row-level permissions
GRANT anon TO authenticator;

-- "authenticated" role for postgrest
CREATE ROLE authenticated NOLOGIN NOINHERIT;
ALTER ROLE authenticated SET statement_timeout = '5s';
GRANT USAGE ON SCHEMA public TO authenticated; -- schema-level permissions
GRANT USAGE ON SCHEMA extensions TO authenticated; -- schema-level permissions
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated; -- table-level permissions
GRANT authenticated TO authenticator;
 
-- "private" schema
CREATE SCHEMA private;

-- "private.users" table
CREATE TABLE private.users (
    "id" uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    "email" text NOT NULL,
    "invitation_code" text DEFAULT NULL,
    "invited_at" timestamptz DEFAULT NULL,
    "verification_code" text DEFAULT NULL,
    "verified_at" timestamptz DEFAULT NULL,
    "recovery_code" text DEFAULT NULL,
    "recovered_at" timestamptz DEFAULT NULL,
    "password_salt" text NOT NULL,
    "password_key" text NOT NULL,
    "metadata" jsonb DEFAULT NULL,
    "created_at" timestamptz DEFAULT now() NOT NULL,
    "updated_at" timestamptz DEFAULT now() NOT NULL,
    UNIQUE("email")
);
ALTER TABLE private.users ENABLE ROW LEVEL SECURITY;

-- "private.sub" function
CREATE OR REPLACE FUNCTION private.sub()
RETURNS uuid
LANGUAGE SQL STABLE
AS $$
	SELECT COALESCE(
		current_setting('request.jwt.claim.sub', true),
		(current_setting('request.jwt.claims', true)::jsonb ->> 'sub')
	)::uuid
$$;

-- "private.role" function
CREATE OR REPLACE FUNCTION private.role()
RETURNS text
LANGUAGE SQL STABLE
AS $$
	SELECT COALESCE(
		current_setting('request.jwt.claim.role', true),
		(current_setting('request.jwt.claims', true)::jsonb ->> 'role')
	)::text
$$;

-- "private.email" function
CREATE OR REPLACE FUNCTION private.email()
RETURNS text
LANGUAGE SQL STABLE
AS $$
	SELECT COALESCE(
		current_setting('request.jwt.claim.email', true),
		(current_setting('request.jwt.claims', true)::jsonb ->> 'email')
	)::text
$$;

-- "sign_up" function
CREATE FUNCTION sign_up(param_email text, param_password text) RETURNS void AS $$
DECLARE
    user_record record;
    password_salt bytea = pgsodium.crypto_pwhash_saltgen();
    password_key bytea = pgsodium.crypto_pwhash(param_password::bytea, password_salt);
BEGIN
    RAISE NOTICE 'sign_up: %', param_email;
    FOR user_record IN
        SELECT * FROM private.users
        WHERE "email" = param_email
        LIMIT 1
    LOOP
        RAISE NOTICE 'FOUND: %', user_record.email;
        RETURN;
    END LOOP;
    RAISE NOTICE 'NOT FOUND: %', param_email;
    INSERT INTO private.users ("email", "password_salt", "password_key") VALUES (param_email, password_salt::text, password_key::text);
END;
$$ LANGUAGE plpgsql;

-- "sign_in" function
CREATE FUNCTION sign_in(param_email text, param_password text) RETURNS void AS $$
DECLARE
    user_record record;
    password_key bytea;
BEGIN
    RAISE NOTICE 'sign_in: %', param_email;
    FOR user_record IN
        (SELECT * FROM private.users WHERE "email" = param_email LIMIT 1)
    LOOP
        RAISE NOTICE 'FOUND: %', user_record.email;
        password_key = pgsodium.crypto_pwhash(param_password::bytea, user_record.password_salt::bytea);
        RAISE NOTICE 'password_key: %', password_key::text;
        RAISE NOTICE 'user_record.password_key: %', user_record.password_key::text;
        IF password_key::text = user_record.password_key THEN
            RAISE NOTICE 'SIGN-IN OK: %', user_record.email;
        END IF;
        RETURN;
    END LOOP;
    RAISE NOTICE 'NOT FOUND: %', param_email;
END;
$$ LANGUAGE plpgsql;

-- test "sign_up", "sign_in"
SELECT COUNT(*) FROM private.users;
SELECT sign_up('admin@local.host', 'test1234');
SELECT sign_up('alice@local.host', 'test1234');
SELECT sign_up('bob@local.host', 'test1234');
SELECT COUNT(*) FROM private.users;
SELECT sign_in('admin@local.host', 'test1234');
SELECT sign_in('null@local.host', 'test1234');
SELECT COUNT(*) FROM private.users;