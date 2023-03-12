// @ts-check

import assert from './assert.mjs';

export class Socket {

  /**
   * @type {string}
   */
  #url = null;

  /**
   * @type {WebSocket}
   */
  #socket = null;

  /**
   * @type {number}
   */
  #timeout = 125;

  /**
   * @type {(timeout: number) => void}
   */
  onbackoff = null;

  /**
   * @type {() => void}
   */
  onopening = null;

  /**
   * @type {() => void}
   */
  onopen = null;

  /**
   * @type {(data: Record<string, any>|ArrayBuffer) => void}
   */
  onmessage = null;

  /**
   * @type {() => void}
   */
  onerror = null;

  /**
   * @type {(code: number, reason: string) => void}
   */
  onclose = null;

  /**
   * @param {string} url
   */
  constructor (url) {
    assert(typeof url === 'string', 'Invalid url.');
    this.#url = url;
  }

  /**
   * 125, 250, 500, 1000, 2000, 4000, 8000
   */
  async backoff () {
    this.#timeout *= 2;
    if (this.#timeout === 16000) {
      this.#timeout = 125;
    }
    if (this.onbackoff instanceof Function) {
      this.onbackoff(this.#timeout);
    }
    await new Promise((resolve) => setTimeout(resolve, this.#timeout));
  }

  open () {
    if (this.onopening instanceof Function) {
      this.onopening();
    }
    this.#socket = new WebSocket(this.#url);
    this.#socket.addEventListener('open', () => {
      if (this.#socket.readyState === 1) {
        if (this.onopen instanceof Function) {
          this.onopen();
        }
      }
    });
    this.#socket.addEventListener('message', (event) => {
      if (this.onmessage instanceof Function) {
        if (this.#socket.binaryType === 'arraybuffer') {
          if (event.data instanceof ArrayBuffer) {
            this.onmessage(event.data);
            return;
          }
        }
        if (this.#socket.binaryType === 'blob') {
          if (typeof event.data === 'string') {
            this.onmessage(JSON.parse(event.data));
            return;
          }
        }
      }
    });
    this.#socket.addEventListener('error', () => {
      if (this.onerror instanceof Function) {
        this.onerror();
      }
    });
    this.#socket.addEventListener('close', async (event) => {
      if (this.onclose instanceof Function) {
        this.onclose(event.code, event.reason);
      }
      this.#socket = null;
      if (event.code === 1000) {
        return;
      }
      await this.backoff();
      this.open();
    });
  }

  /**
   * @param {ArrayBuffer|Record<string, any>} data
   */
  send (data) {
    assert(data instanceof ArrayBuffer || data instanceof Object, 'Invalid message, cannot send.');
    assert(this.#socket instanceof WebSocket, 'WebSocket is disconnected, cannot send.');
    assert(this.#socket.readyState === 1, 'WebSocket is disconnected, cannot send.');
    if (data instanceof ArrayBuffer) {
      this.#socket.send(data);
      return;
    }
    if (data instanceof Object) {
      this.#socket.send(JSON.stringify(data));
      return;
    }
  }

  close () {
    if (this.#socket instanceof WebSocket) {
      if (this.#socket.readyState === 1) {
        this.#socket.close(1000);
      }
    }
  }

  get state () {
    if (this.#socket instanceof WebSocket) {
      return this.#socket.readyState;
    }
    return null;
  }

  get connected () {
    if (this.#socket instanceof WebSocket) {
      return this.#socket.readyState === 1;
    }
    return false;
  }

}

export default Socket;

