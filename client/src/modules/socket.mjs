// @ts-check

import assert from './assert.mjs';

export class Socket extends EventTarget {

  /**
   * @type {string}
   */
  #url = null;

  /**
   * @type {WebSocket}
   */
  #client = null;

  /**
   * @type {number}
   */
  #backoff = 125;

  /**
   * @param {string} url
   */
  constructor (url) {
    super();
    this.#url = url;
  }

  async backoff () {
    this.#backoff *= 2;
    if (this.#backoff > 4000) {
      this.#backoff = 125;
    }
    await new Promise((resolve) => setTimeout(resolve, this.#backoff));
  }

  connect () {
    this.#client = new WebSocket(this.#url);
    this.#client.addEventListener('open', (event) => {
      if (this.#client.readyState === 1) {
        this.dispatchEvent(event);
      }
    });
    this.#client.addEventListener('message', (event) => {
      assert(typeof event.data === 'string', 'Invalid data.');
      this.dispatchEvent(event);
    });
    this.#client.addEventListener('error', (event) => {
      this.dispatchEvent(event);
    });
    this.#client.addEventListener('close', async (event) => {
      this.dispatchEvent(event);
      this.#client = null;
      if (event.code === 1000) {
        return;
      }
      await this.backoff();
      queueMicrotask(this.connect);
    });
  }

  /**
   * @param {ArrayBuffer|Record<string, any>} data
   */
  send (data) {
    assert(data instanceof ArrayBuffer || data instanceof Object, 'Invalid message, cannot send.');
    assert(this.#client instanceof WebSocket, 'WebSocket is disconnected, cannot send.');
    assert(this.#client.readyState === 1, 'WebSocket is disconnected, cannot send.');
    if (data instanceof ArrayBuffer) {
      this.#client.send(data);
      return;
    }
    if (data instanceof Object) {
      this.#client.send(JSON.stringify(data));
      return;
    }
  }

  close () {
    if (this.#client instanceof WebSocket) {
      if (this.#client.readyState === 1) {
        this.#client.close(1000);
      }
    }
  }

  get state () {
    if (this.#client instanceof WebSocket) {
      return this.#client.readyState;
    }
    return null;
  }

  get connected () {
    if (this.#client instanceof WebSocket) {
      return this.#client.readyState === 1;
    }
    return false;
  }

}

export default Socket;
