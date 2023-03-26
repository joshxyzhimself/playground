// @ts-check
import path from 'path';
import assert from 'assert';

/**
 * @param {string} base_url
 * @param {string} base_directory
 * @param {string} url
 * @description Resolves base_url, base_directory, and url.
 */
export const resolve = (base_url, base_directory, url) => {
  assert(typeof base_url === 'string');
  assert(typeof base_directory === 'string');
  assert(typeof url === 'string');
  const url_match = url.startsWith(base_url);
  assert(url_match === true);
  const url_relative = url.substring(base_url.length);
  const url_absolute = path.join(base_directory, url_relative);
  return url_absolute;
};

export default resolve;
