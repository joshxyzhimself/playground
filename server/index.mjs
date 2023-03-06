// @ts-check

import url from 'url';
import path from 'path';
import fetch from 'node-fetch';
import * as httpserv from './httpserv/index.mjs';
import on_exit from './httpserv/on_exit.mjs';
import env from './httpserv/env.mjs';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(env);

const app = httpserv.uws.App({});

httpserv.serve({
  app,
  include: [
    {
      url: '/',
      directory: path.join(__dirname, '../client/dist/'),
      use_cache: env.get('PLAYGROUND_ENVIRONMENT') === 'production',
    },
  ],
  exclude: ['/api/'],
});

app.get('/api/coins-ph-markets', httpserv.use(async (response) => {
  const res = await fetch('https://quote.coins.ph/v2/markets');
  response.json = await res.json();
}));

/**
 * Request Method: GET
 * Request URL Pathname: /api/example
 * Response Status: 200
 * Response Headers Content-Type: text/plain
 * CURL Test: curl http://localhost:8080/api/example
 */
app.get('/api/example', httpserv.use(async (response) => {
  response.text = 'Hello world!';
}));

/**
 * Request Method: POST
 * Request URL Pathname: /api/example
 * Response Status: 200
 * Response Headers Content-Type: application/json
 * CURL Test: curl -X POST http://localhost:8080/api/example
 */
app.post('/api/example', httpserv.use(async (response, request) => {
  response.json = { request };
}));

const port = 8080;

console.log(`Playground: Listening at port ${port}..`);
const token = await httpserv.http(app, httpserv.port_access_types.EXCLUSIVE, port);

console.log('Playground: Listen OK.');

on_exit(() => {

  console.log('Playground: Closing sockets..');
  httpserv.uws.us_listen_socket_close(token);

  console.log('Playground: Close sockets OK.');

});