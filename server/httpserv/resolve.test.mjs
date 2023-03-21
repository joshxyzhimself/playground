// @ts-check

import resolve from './resolve.mjs';

const tests = [
  { base_url: '/', base_directory: '/dist', url: '/static/example.js' },
  { base_url: '/images', base_directory: '/temp/images', url: '/images/example.jpg' },
];

tests.forEach((test) => {
  const resolved = resolve(test.base_url, test.base_directory, test.url);
  console.log({ ...test, resolved });
});
