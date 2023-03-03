// @ts-check

import React from 'react';
import * as hs256 from '../modules/hs256.mjs';

/**
 * @type {import('./SignIn').SignIn}
 */
export const SignIn = (props) => {

  const { history, set_session } = props;

  const [username, set_username] = React.useState('');
  const [password, set_password] = React.useState('');

  const sign_in = React.useCallback(async () => {
    try {
      const headers = new Headers();
      headers.set('Content-Type', 'application/json; charset=utf-8');
      const response = await fetch('/sign-in', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ username, password }),
      });
      if (response.status >= 400) {
        const response_text = await response.text();
        throw new Error(response_text);
      }
      if (response.status >= 200) {
        const response_text = await response.text();
        const token = response_text;
        const token_data = hs256.read_token(token);
        console.log(token_data);
        set_session(token);
        history.push('/example');
      }
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  }, [history, set_session, username, password]);

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="w-full md:w-1/2 p-2">
        <div className="py-1 text-left text-xl font-medium">
          Sign in
        </div>
        <form
          className="py-4 flex flex-col justify-start items-center gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            queueMicrotask(sign_in);
          }}
        >
          <div className="w-full">
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => set_username(e.target.value)}
              autoCapitalize="off"
              autoComplete="off"
              spellCheck={false}
              autoFocus={true}
              required={true}
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => set_password(e.target.value)}
              autoCapitalize="off"
              autoComplete="off"
              spellCheck={false}
              autoFocus={false}
              required={true}
            />
          </div>
          <div className="w-full flex flex-row justify-end">
            <button type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
