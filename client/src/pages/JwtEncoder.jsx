// @ts-check

import React from 'react';
import Editor from '@monaco-editor/react';
import * as luxon from 'luxon';
import * as hs256 from '../modules/hs256.mjs';
import assert from '../modules/assert.mjs';

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
 * @type {import('./JwtEncoder').JwtEncoder}
 */
export const JwtEncoder = (props) => {
  const { history } = props;

  /**
   * @type {import('./JwtEncoder').State<string>}
   */
  const [secret, set_secret] = React.useState('');

  /**
   * @type {import('./JwtEncoder').State<string>}
   */
  const [header, set_header] = React.useState('');

  /**
   * @type {import('./JwtEncoder').State<string>}
   */
  const [payload, set_payload] = React.useState('');

  /**
   * @type {import('./JwtEncoder').State<string>}
   */
  const [token, set_token] = React.useState('');

  /**
   * @type {import('./JwtDecoder').State<string>}
   */
  const [message, set_message] = React.useState('');

  React.useEffect(() => {
    const next_secret = hs256.create_secret(32);
    const next_header = JSON.stringify(default_header, null, 2);
    const next_payload = JSON.stringify(default_payload, null, 2);
    set_secret(next_secret);
    set_header(next_header);
    set_payload(next_payload);
  }, []);

  React.useEffect(() => {
    try {
      if (secret.length > 0) {
        if (header.length > 0) {
          /**
           * @type {import('../modules/hs256').header}
           */
          const header_data = JSON.parse(header);
          assert(header_data.alg === 'HS256', 'Only alg=HS256 is supported.');
          assert(header_data.typ === 'JWT', 'Only typ=JWT is supported.');
          if (payload.length > 0) {
            const next_token = hs256.create_token(JSON.parse(header), JSON.parse(payload), secret);
            set_token(next_token);
            set_message('JWT Encode OK.');
            return;
          }
        }
      }
      set_message('');
    } catch (e) {
      console.error(e);
      set_token('');
      set_message(`JWT Encode Error: ${e.message}`);
    }
  }, [secret, header, payload]);

  return (
    <div style={{ padding: 8 }}>
      <div className="p-4">

        <div className="p-1 text-left text-2xl font-medium">
          JWT Encoder
        </div>

        <div className="p-1 w-full sm:w-3/4 md:w-2/3 text-left text-base font-light">
          JSON Web Token HS256 Encoder. Encodes the header and the payload into a token, using the Base64-encoded secret.
        </div>

        <div className="w-full flex flex-row flex-wrap justify-start items-start">

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
                onChange={(value) => {
                  set_payload(value);
                }}
                options={{ minimap: { enabled: false } }}
              />
            </div>
          </div>

          <div className="p-1 w-full">
            <div className="py-1 text-left text-base font-medium">
              Token
            </div>
            <div className="h-24 w-full">
              <Editor
                theme="vs-dark"
                defaultLanguage="text"
                value={token}
                options={{ minimap: { enabled: false }, readOnly: true, wordWrap: 'on' }}
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

export default JwtEncoder;