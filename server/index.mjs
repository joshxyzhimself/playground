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

const one_second = 1000;
const one_minute = 60 * one_second;
const one_hour = 60 * one_minute;

/**
 * @type {import('./index').cache}
 */
const cache = new Map();

console.log('Playground: Starting cache interval..');
const cache_interval = setInterval(() => {
  cache.forEach((item, key) => {
    if (Date.now() - item.timestamp > one_hour) {
      console.log(`Playground: Removing cached data for "${key}".`);
      cache.delete(key);
    }
  });
}, one_minute);

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

app.get('/api/btc-usd-candles', httpserv.use(async (response, request) => {
  const external_api_url = 'https://api.exchange.coinbase.com/products/BTC-USD/candles?granularity=86400';
  if (cache.has(external_api_url) === false) {
    console.log(`Playground: External API data cached for "${external_api_url}".`);
    const res = await fetch(external_api_url);
    const data = await res.json();
    const item = { timestamp: Date.now(), data };
    cache.set(external_api_url, item);
  }
  const item = cache.get(external_api_url);
  response.json = item.data;
}));
app.get('/api/local-exchange-rates', httpserv.use(async (response, request) => {
  const external_api_url = 'https://quote.coins.ph/v2/markets';
  if (cache.has(external_api_url) === false) {
    console.log(`Playground: External API data cached for "${external_api_url}".`);
    const res = await fetch(external_api_url);
    const data = await res.json();
    const item = { timestamp: Date.now(), data };
    cache.set(external_api_url, item);
  }
  const item = cache.get(external_api_url);
  response.json = item.data;
}));
app.get('/api/foreign-exchange-rates', httpserv.use(async (response, request) => {
  const external_api_url = 'https://openexchangerates.org/api/latest.json?prettyprint=false&app_id=647db71ea7d446d3a2bfa8b7fa18649c';
  if (cache.has(external_api_url) === false) {
    console.log(`Playground: External API data cached for "${external_api_url}".`);
    const res = await fetch(external_api_url);
    const data = await res.json();
    const item = { timestamp: Date.now(), data };
    cache.set(external_api_url, item);
  }
  const item = cache.get(external_api_url);
  response.json = item.data;
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

  console.log('Playground: Clearing cache interval..');
  clearInterval(cache_interval);
  console.log('Playground: Clearing cache interval OK.');

});