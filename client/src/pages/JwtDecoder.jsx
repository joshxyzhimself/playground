// @ts-check

import React from 'react';
import Editor from '@monaco-editor/react';
import * as luxon from 'luxon';
import * as hs256 from '../modules/hs256.mjs';

/**
 * @type {import('../modules/hs256').header}
 */
const default_header = { alg: 'HS256', typ: 'JWT' };

/**
 * @type {import('../modules/hs256').payload}
 */
const default_payload = {
  iat: Math.trunc(luxon.DateTime.now().toSeconds()),
  nbf: Math.trunc(luxon.DateTime.now().toSeconds()),
  exp: Math.trunc(luxon.DateTime.now().plus({ hours: 6 }).toSeconds()),
  iss: 'example-issuer',
  aud: 'example-audience',
  sub: 'example-subject',
};

/**
 * @type {import('./JwtDecoder').JwtDecoder}
 */
export const JwtDecoder = (props) => {
  const { history } = props;

  /**
   * @type {import('./JwtDecoder').State<string>}
   */
  const [secret, set_secret] = React.useState('');

  /**
   * @type {import('./JwtDecoder').State<string>}
   */
  const [header, set_header] = React.useState('');

  /**
   * @type {import('./JwtDecoder').State<string>}
   */
  const [payload, set_payload] = React.useState('');

  /**
   * @type {import('./JwtDecoder').State<string>}
   */
  const [token, set_token] = React.useState('');

  /**
   * @type {import('./JwtDecoder').State<string>}
   */
  const [message, set_message] = React.useState('');

  React.useEffect(() => {
    const next_secret = hs256.create_secret(32);
    const next_token = hs256.create_token(default_header, default_payload, next_secret);
    set_secret(next_secret);
    set_token(next_token);
  }, []);

  React.useEffect(() => {
    try {
      if (token.length > 0) {
        const token_data = hs256.read_token(token);
        set_header(JSON.stringify(token_data.header, null, 2));
        set_payload(JSON.stringify(token_data.payload, null, 2));
        set_message('JWT Decode OK.');
        if (secret.length > 0) {
          try {
            hs256.verify_sig(token, secret);
            set_message('JWT Decode OK. JWT Signature Verification OK.');
          } catch (e) {
            console.error(e);
            set_message(`JWT Decode OK. JWT Signature Verification Error: ${e.message}`);
          }
        }
      }
    } catch (e) {
      console.error(e);
      set_header('');
      set_payload('');
      set_message(`JWT Decode Error: ${e.message}`);
    }
  }, [token, secret]);

  return (
    <div style={{ padding: 8 }}>
      <div className="p-4">

        <div className="p-1 text-left text-2xl font-medium">
          JWT Decoder
        </div>

        <div className="p-1 w-full sm:w-3/4 md:w-2/3 text-left text-base font-light">
          JSON Web Token HS256 Decoder. Decodes the header and the payload from a token, verifies the signature using the Base64-encoded secret.
        </div>

        <div className="w-full flex flex-row flex-wrap justify-start items-start">

          <div className="p-1 w-full">
            <div className="py-1 text-left text-base font-medium">
              Token
            </div>
            <div className="h-24 w-full">
              <Editor
                theme="vs-dark"
                defaultLanguage="text"
                value={token}
                onChange={(value) => {
                  set_token(value);
                }}
                options={{ minimap: { enabled: false }, wordWrap: 'on' }}
              />
            </div>
          </div>

          <div className="p-1 w-full sm:w-1/2 md:w-1/3">
            <div className="py-1 text-left text-base font-medium">
              Header
            </div>
            <div className="h-48 w-full">
              <Editor
                theme="vs-dark"
                defaultLanguage="json"
                value={header}
                options={{ minimap: { enabled: false }, readOnly: true }}
              />
            </div>
          </div>

          <div className="p-1 w-full sm:w-1/2 md:w-2/3">
            <div className="py-1 text-left text-base font-medium">
              Payload
            </div>
            <div className="h-48 w-full">
              <Editor
                theme="vs-dark"
                defaultLanguage="json"
                value={payload}
                options={{ minimap: { enabled: false }, readOnly: true }}
              />
            </div>
          </div>

          <div className="p-1 w-full">
            <div className="py-1 text-left text-base font-medium">
              Secret (Base64-encoded)
            </div>
            <div className="h-16 w-full">
              <Editor
                theme="vs-dark"
                defaultLanguage="text"
                value={secret}
                onChange={(value) => {
                  set_secret(value);
                }}
                options={{ minimap: { enabled: false }, wordWrap: 'on' }}
              />
            </div>
            { message.includes('Error') === false && (
              <div className="p-1 text-left text-xs font-medium text-white bg-green-600">
                { message }
              </div>
            ) }
            { message.includes('Error') === true && (
              <div className="p-1 text-left text-xs font-medium text-white bg-red-600">
                { message }
              </div>
            ) }
          </div>

        </div>

        <div className="px-1 py-2">
          <hr />
        </div>

        <div className="p-1 text-left text-xs font-light">
          Crafted by @joshxyzhimself.
        </div>

      </div>
    </div>
  );
};

export default JwtDecoder;