// @ts-check

import fs from 'fs';
import url from 'url';
import path from 'path';
import assert from 'assert';
import * as server from './server/index.mjs';
import on_exit from './server/on_exit.mjs';
import env from './server/env.mjs';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(env);

const app = server.uws.App({});
 
/**
 * Request Method: GET
 * Request URL Pathname: /
 * Response Status: 200
 * Response Headers Content-Type: text/plain
 * CURL Test: curl http://localhost:8080/
 */
app.get('/', server.use(async (response) => {
  response.text = 'Hello world!';
}));

/**
 * Request Method: POST
 * Request URL Pathname: /example
 * Response Status: 200
 * Response Headers Content-Type: application/json
 * CURL Test: curl -X POST http://localhost:8080/example
 */
app.post('/example', server.use(async (response, request) => {
  response.json = { request };
}));

const port = 8080;

console.log(`Playground: Listening at port ${port}..`);
const token = await server.http(app, server.port_access_types.EXCLUSIVE, port);

console.log('Playground: Listen OK.');

on_exit(() => {

  console.log('Playground: Closing sockets..');
  server.uws.us_listen_socket_close(token);

  console.log('Playground: Close sockets OK.');

});