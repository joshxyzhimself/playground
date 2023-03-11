// @ts-check

import fs from 'fs';
import url from 'url';
import path from 'path';
import assert from 'assert';
import crypto from 'crypto';
import { default as sharp } from 'sharp';
import fetch from 'node-fetch';
import * as httpserv from './httpserv/index.mjs';
import on_exit from './httpserv/on_exit.mjs';
import env from './httpserv/env.mjs';

console.log(env);

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __temp = path.join(__dirname, '/temp/');
const __images = path.join(__temp, '/images');

if (fs.existsSync(__images) === false) {
  fs.mkdirSync(__images, { recursive: true });
}

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

// i think we should replace /images with /
// this way we can serve from __images and not __temp
httpserv.serve({
  app,
  include: [
    {
      url: '/',
      directory: path.join(__dirname, '../client/dist/'),
      use_cache: env.get('PLAYGROUND_ENVIRONMENT') === 'production',
    },
    {
      url: '/images',
      directory: __temp,
      use_cache: env.get('PLAYGROUND_ENVIRONMENT') === 'production',
    },
  ],
  exclude: ['/api/'],
  debug: false,
});

app.get('/api/trader-dashboard/ip-info', httpserv.use(async (response, request) => {
  const ip = request.headers.get('x-forwarded-for') || 'json';
  const external_api_url = `https://ipinfo.io/${ip}?token=24685cdbd4a1ac`;
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

app.get('/api/trader-dashboard/btc-usd-candles', httpserv.use(async (response, request) => {
  console.log(request);
  console.log(request.headers);
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

app.get('/api/trader-dashboard/local-exchange-rates', httpserv.use(async (response, request) => {
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

app.get('/api/trader-dashboard/foreign-exchange-rates', httpserv.use(async (response, request) => {
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

app.post('/api/image-uploader/images', httpserv.use(async (response, request) => {
  console.log(request);
  console.log(request.parts);
  assert(request.parts.length > 0);
  const file = request.parts[0];
  const file_buffer = new Uint8Array(file.data);
  const file_metadata = await sharp(file_buffer).metadata();
  const converted_buffer = await sharp(file_buffer).jpeg({ mozjpeg: true }).toBuffer();
  const converted_metadata = await sharp(converted_buffer).metadata();
  const converted_hash = crypto.createHash('sha224').update(converted_buffer).digest('hex');
  const converted_basename = converted_hash.concat('.', converted_metadata.format);
  const converted_path = path.join(__images, converted_basename);
  const converted_url = path.join('/images/', converted_basename);
  if (fs.existsSync(converted_path) === false) {
    fs.writeFileSync(converted_path, converted_buffer);
  }
  response.json = {
    file_metadata,
    converted_metadata,
    converted_hash,
    converted_basename,
    converted_path,
    converted_url,
  };
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