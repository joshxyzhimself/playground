// @ts-check

import React from 'react';
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
          <div className="flex flex-row justify-start items-center gap-1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                queueMicrotask(send);
              }}
            >
              <div id="name" className="">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => set_name(e.target.value)}
                />
              </div>
              <div id="message" className="">
                <input
                  type="text"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => set_message(e.target.value)}
                />
              </div>
              <div id="send" className="">

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