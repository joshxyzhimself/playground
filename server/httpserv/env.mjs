// @ts-check

import fs from 'fs';
import url from 'url';
import path from 'path';
import assert from 'assert';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env_path = path.join(__dirname, '../.env');
assert(fs.existsSync(env_path) === true);

/**
 * @type {Map<string, string>}
 */
const env = new Map();

const env_data = fs.readFileSync(env_path, { encoding: 'utf-8' });
env_data.split('\n').forEach((line) => {
  const index = line.indexOf('=');
  const key = line.substring(0, index);
  const value = line.substring(index + 1);
  env.set(key, value);
});

export default env;
