// @ts-check

import React from 'react';
import assert from '../modules/assert.mjs';
import Socket from '../modules/socket.mjs';

/**
 * Coverage:
 * - [x] user can connect websocket when entering page
 * - [x] user can disconnect websocket when leaving page
 * - [ ] 1. user sends { action: 'join', name }.
 * - [ ] 3. server sends { action: 'accept' } or { action: 'reject' }
 * - [ ] 4. server sets user's name on server-side.
 * - [ ] 5. user semds { action: 'message', message }
 * - [ ] user can send bot commands
 * - [ ] user can receive bot command responses
 * - [ ] user can see chat history
 * - [ ] user messages are displayed with cure53's dompurify https://github.com/cure53/DOMPurify
 * - [ ] user messages are rendered with react-markdown https://github.com/remarkjs/react-markdown
 */

/**
 * @type {import('./WebSocketChat').WebSocketChat}
 */
export const WebSocketChat = (props) => {

  const { history } = props;

  /**
   * @type {React.MutableRefObject<import('../modules/socket.mjs').Socket>}
   */
  const socket = React.useRef(null);

  /**
   * @type {import('./WebSocketChat').State<boolean>}
   */
  const [connected, set_connected] = React.useState(false);

  /**
   * @type {import('./WebSocketChat').State<string>}
   */
  const [name, set_name] = React.useState('');

  /**
   * @type {import('./WebSocketChat').State<boolean>}
   */
  const [accepted, set_accepted] = React.useState(false);

  /**
   * @type {import('./WebSocketChat').State<string>}
   */
  const [message, set_message] = React.useState('');

  /**
   * @type {import('./WebSocketChat').State<import('./WebSocketChat').message[]>}
   */
  const [messages, set_messages] = React.useState([]);

  React.useEffect(() => {
    // create and connect websocket
    const protocol = window.location.protocol.replace('http', 'ws');
    const url = `${protocol}//${window.location.host}/`;
    socket.current = new Socket(url);
    socket.current.onopen = () => {
      set_connected(true);
    };
    socket.current.onmessage = (data) => {
      try {
        console.log('Socket message.');
        console.log({ data });
        if (data instanceof ArrayBuffer) {
          return;
        }
        if (data instanceof Object) {
          assert(typeof data.action === 'string');
          switch (data.action) {
            case 'accept': {
              set_accepted(true);
              break;
            }
            case 'error': {
              assert(typeof data.message === 'string');
              throw new Error(data.message);
            }
            case 'message': {
              console.log(data);
              break;
            }
            default: {
              break;
            }
          }
        }
      } catch (e) {
        console.error(e);
        alert(e.message);
      }
    };
    socket.current.onclose = () => {
      set_connected(false);
      set_name('');
      set_accepted(false);
      set_message('');
      set_messages([]);
    };
    socket.current.open();
    return () => {
      // disconnect websocket
      socket.current.close();
    };
  }, []);

  /**
   * Bot commands:
   * - /ip
   * - /rates [base] [quote]
   */

  const join = React.useCallback(async () => {
    try {
      socket.current.send({ action: 'join', name: name.trim() });
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  }, [name]);

  const send = React.useCallback(async () => {
    try {
      socket.current.send({ action: 'message', text: message.trim() });
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  }, [message]);

  return (
    <div style={{ padding: 8 }}>
      <div className="p-4">

        <div className="p-1 text-left text-2xl font-medium">
          WebSocket Chat
        </div>

        <div className="p-1 w-full sm:w-3/4 md:w-2/3 text-left text-base font-light">
          Old school chat room, with built-in bot commands.
        </div>

        <div className="p-4">

          <div className="m-1 p-1 w-full">

            { connected === false && (
              <React.Fragment>
                <div className="p-1 border-l-2 border-red-200">
                  <div className="p-1 w-fit text-left text-sm font-light bg-red-50 rounded">
                    Disconnected
                  </div>
                  <div className="px-1 w-auto text-left text-xs font-normal">
                    Status
                  </div>
                </div>
              </React.Fragment>
            ) }

            { connected === true && (
              <React.Fragment>
                <div className="p-1 border-l-2 border-green-200">
                  <div className="p-1 w-fit text-left text-sm font-light bg-green-50 rounded">
                    Connected
                  </div>
                  <div className="px-1 w-auto text-left text-xs font-normal">
                    Status
                  </div>
                </div>
              </React.Fragment>
            ) }

            <div className="p-1 border-l-2 border-emerald-200">
              <div className="p-1 w-fit text-left text-sm font-light bg-emerald-50 rounded">
                Example message goes here.
              </div>
              <div className="px-1 w-auto text-left text-xs font-normal">
                Alice &bull; HH:MM:SS
              </div>
            </div>

            <div className="p-1 border-l-2 border-slate-200">
              <div className="p-1 w-fit text-left text-sm font-light bg-slate-50 rounded">
                Example message goes here.
              </div>
              <div className="px-1 w-auto text-left text-xs font-normal">
                You &bull; HH:MM:SS
              </div>
            </div>

          </div>

          { accepted === false && (
            <React.Fragment>
              <div className="m-1 p-1 w-full">
                <div className="flex flex-col justify-start items-start">
                  <form
                    className="w-full flex flex-col sm:flex-row justify-start items-center"
                    onSubmit={(e) => {
                      e.preventDefault();
                      queueMicrotask(join);
                    }}
                  >
                    <div className="p-1 w-full sm:flex-grow">
                      <input
                        className="w-full"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => set_name(e.target.value)}
                        disabled={connected === false}
                      />
                    </div>
                    <div className="p-1 w-full sm:w-32">
                      <button type="submit" disabled={connected === false}>
                        Join
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </React.Fragment>
          ) }

          { accepted === true && (
            <React.Fragment>
              <div className="p-1 w-full">
                <form
                  className="w-full flex flex-col sm:flex-row justify-start items-center"
                  onSubmit={(e) => {
                    e.preventDefault();
                    queueMicrotask(send);
                  }}
                >
                  <div className="p-1 w-full sm:flex-grow">
                    <input
                      className="w-full"
                      type="text"
                      placeholder="Message"
                      value={message}
                      onChange={(e) => set_message(e.target.value)}
                    />
                  </div>
                  <div className="p-1 w-full sm:w-32">
                    <button type="submit" >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </React.Fragment>
          ) }

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

export default WebSocketChat;