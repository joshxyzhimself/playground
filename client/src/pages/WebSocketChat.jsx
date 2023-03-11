// @ts-check

import React from 'react';
import assert from '../modules/assert.mjs';
import Socket from '../modules/socket.mjs';

/**
 * Coverage:
 * - [ ] user can connect websocket
 * - [ ] user can set name
 * - [ ] user can set message
 * - [ ] user can send name and message
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
   * @type {import('./WebSocketChat').State<string>}
   */
  const [name, set_name] = React.useState('');

  /**
   * @type {import('./WebSocketChat').State<string>}
   */
  const [message, set_message] = React.useState('');

  React.useEffect(() => {
    // create and connect websocket
    return () => {
      // disconnect websocket
    };
  }, []);

  /**
   * Bot commands:
   * - /ip
   * - /rates [base] [quote]
   */

  const send = React.useCallback(async () => {
    try {
      /**
       * [ ] trim and validate name
       * [ ] trim and validate message
       */
      console.log({ name, message });
      assert(name.trim().length > 0, 'Invalid name length.');
      assert(message.trim().length > 0, 'Invalid message length.');
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  }, [name, message]);

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
          <div className="chatbox">

          </div>
          <div className="w-full">
            <form
              className="w-full flex flex-col sm:flex-row justify-start items-center"
              onSubmit={(e) => {
                e.preventDefault();
                queueMicrotask(send);
              }}
            >
              <div className="p-1 w-full sm:w-32">
                <input
                  className="w-full"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => set_name(e.target.value)}
                />
              </div>
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