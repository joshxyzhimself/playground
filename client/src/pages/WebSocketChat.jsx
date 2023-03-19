// @ts-check

import React from 'react';
import assert from '../modules/assert.mjs';
import Socket from '../modules/socket.mjs';
import Link from '../components/Link';

/**
 * @typedef {import('./WebSocketChat').message} message
 * @typedef {import('./WebSocketChat').message_group} message_group
 */

/**
 * Coverage:
 * - [x] user can connect websocket when entering page
 * - [x] user can disconnect websocket when leaving page
 * - [x] 1. user sends { action: 'join', name }.
 * - [x] 2. server sends { action: 'accept' }
 * - [x] 3. user semds { action: 'message', message }
 * - [x] 4. server broadcasts message properly
 * - [x] 5. user sees rendered messages properly
 * - [x] broadcast: user as joined the chat.
 * - [x] broadcast: user as left the chat.
 * - [ ] mobile responsiveness
 *
 * Note:
 * - Other features are cut-off to let us focus on other important things.
 *
 * Someday:
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
   * @type {React.MutableRefObject<HTMLInputElement>}
   */
  const name_input_ref = React.useRef(null);

  /**
   * @type {React.MutableRefObject<HTMLInputElement>}
   */
  const message_input_ref = React.useRef(null);

  /**
   * @type {import('./WebSocketChat').State<import('../modules/socket.mjs').Socket>}
   */
  const [socket, set_socket] = React.useState(null);

  /**
   * @type {import('./WebSocketChat').State<boolean>}
   */
  const [connected, set_connected] = React.useState(false);

  /**
   * @type {import('./WebSocketChat').State<string[]>}
   */
  const [users, set_users] = React.useState([]);

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
   * @type {import('./WebSocketChat').State<message_group[]>}
   */
  const [message_groups, set_message_groups] = React.useState([]);


  /**
   * @param {message} next_message
   */
  const append_message = (next_message) => {
    if (message_groups.length > 0) {
      const last_message_group_index = message_groups.length - 1;
      const last_message_group = message_groups[last_message_group_index];
      if (last_message_group.name === next_message.name) {
        /**
         * @type {message_group}
         */
        const next_message_group = {
          name: last_message_group.name,
          messages: [...last_message_group.messages, next_message],
          system: next_message.system,
          timestamp: next_message.timestamp,
        };
        const next_message_groups = message_groups.slice();
        next_message_groups[last_message_group_index] = next_message_group;
        set_message_groups(next_message_groups);
        return;
      }
    }
    /**
     * @type {message_group}
     */
    const next_message_group = {
      name: next_message.name,
      messages: [next_message],
      system: next_message.system,
      timestamp: next_message.timestamp,
    };
    const next_message_groups = message_groups.slice();
    next_message_groups.push(next_message_group);
    set_message_groups(next_message_groups);
  };
  const append_message_callback = React.useCallback(append_message, [message_groups]);

  /**
   * @description This effect handles our connection and disconnection.
   */
  React.useEffect(() => {
    const protocol = window.location.protocol.replace('http', 'ws');
    const url = `${protocol}//${window.location.host}/`;
    const next_socket = new Socket(url);
    set_socket(next_socket);
    next_socket.open();
    return () => {
      next_socket.close();
    };
  }, []);

  /**
   * @description This effect handles our messages. Isolated to prevent useEffect mount-unmount loop bug.
   */
  React.useEffect(() => {
    if (socket instanceof Socket) {
      socket.onopening = () => {
        /**
         * @type {message}
         */
        const system_message = {
          action: 'message',
          name: 'System',
          text: 'Connecting..',
          timestamp: Date.now(),
          system: true,
          system_variant: 2,
        };
        append_message_callback(system_message);
      };
      socket.onopen = () => {
        /**
         * @type {message}
         */
        const system_message = {
          action: 'message',
          name: 'System',
          text: 'You have connected to the server.',
          timestamp: Date.now(),
          system: true,
          system_variant: 1,
        };
        append_message_callback(system_message);
        set_connected(true);
        set_users([]);
      };
      socket.onclose = () => {
        if (connected === true) {
          /**
           * @type {message}
           */
          const system_message = {
            action: 'message',
            name: 'System',
            text: 'You have disconnected from the server.',
            timestamp: Date.now(),
            system: true,
            system_variant: 0,
          };
          append_message_callback(system_message);
          set_connected(false);
          set_users([]);
          set_name('');
          set_accepted(false);
          set_message('');
        }
      };
    }
    return () => {
      if (socket instanceof Socket) {
        socket.onopening = null;
        socket.onopen = null;
        socket.onclose = null;
      }
    };
  }, [socket, connected, append_message_callback]);

  /**
   * @description This effect handles our messages. Isolated to prevent useEffect mount-unmount loop bug.
   */
  React.useEffect(() => {
    if (socket instanceof Socket) {
      socket.onmessage = (data) => {
        try {
          if (data instanceof ArrayBuffer) {
            return;
          }
          if (data instanceof Object) {
            assert(typeof data.action === 'string');
            switch (data.action) {
              case 'users': {
                assert(data.users instanceof Array);
                set_users(data.users);
                break;
              }
              case 'accept': {
                set_accepted(true);
                break;
              }
              case 'error': {
                assert(typeof data.message === 'string');
                throw new Error(data.message);
              }
              case 'message': {
                // @ts-ignore
                append_message_callback(data);
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
    }
    return () => {
      if (socket instanceof Socket) {
        socket.onmessage = null;
      }
    };
  }, [socket, append_message_callback]);

  React.useEffect(() => {
    if (connected === true) {
      if (accepted === true) {
        if (message_input_ref.current instanceof Object) {
          if (message_input_ref.current.focus instanceof Function) {
            message_input_ref.current.focus();
          }
        }
      } else {
        if (name_input_ref.current instanceof Object) {
          if (name_input_ref.current.focus instanceof Function) {
            name_input_ref.current.focus();
          }
        }
      }
    }
  }, [connected, accepted]);

  const join = React.useCallback(async () => {
    try {
      socket.send({ action: 'join', name: name.trim() });
      set_name(name.trim());
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  }, [socket, name]);

  const send = React.useCallback(async () => {
    try {
      socket.send({ action: 'message', text: message.trim() });
      set_message('');
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  }, [socket, message]);

  return (
    <div style={{ padding: 8 }}>
      <div className="p-4">

        <div className="p-1 text-left text-2xl font-medium">
          WebSocket Chat
        </div>

        <div className="p-1 w-full sm:w-3/4 md:w-2/3 text-left text-base font-normal">
          WebSocket chat room. Users can set their name. Users cannot have the same name. Users are notified on who joins and leaves. Users can see who are currently in the chat room. System and User messages are displayed nicely.
        </div>

        <div className="p-1 w-48">
          <Link history={history} href="/websocket-chat" target="_blank">
            <button type="button">
              Open in new tab
            </button>
          </Link>
        </div>

        <div className="p-4">

          <div className="m-1 p-1 w-full">

            { message_groups.map((message_group, message_group_index) => {
              if (message_group.system === true) {
                return (
                  <React.Fragment key={message_group_index}>
                    <div className="p-1 border-l-4 border-slate-200">
                      { message_group.messages.map((item) => {
                        switch (item.system_variant) {
                          case 0: {
                            return (
                              <div className="m-1 p-1 w-fit text-left text-xs font-normal bg-rose-100 rounded" key={item.timestamp}>
                                { item.text }
                              </div>
                            );
                          }
                          case 1: {
                            return (
                              <div className="m-1 p-1 w-fit text-left text-xs font-normal bg-emerald-100 rounded" key={item.timestamp}>
                                { item.text }
                              </div>
                            );
                          }
                          case 2: {
                            return (
                              <div className="m-1 p-1 w-fit text-left text-xs font-normal bg-amber-100 rounded" key={item.timestamp}>
                                { item.text }
                              </div>
                            );
                          }
                          default: {
                            return null;
                          }
                        }
                      }) }
                      <div className="mx-1 px-1 w-auto text-left text-xs font-medium text-slate-400">
                        { message_group.name }
                      </div>
                    </div>
                  </React.Fragment>
                );
              }
              if (message_group.name === name) {
                return (
                  <React.Fragment key={message_group_index}>
                    <div className="p-1 border-l-4 border-slate-200">
                      { message_group.messages.map((item) => {
                        return (
                          <div className="m-1 p-1 w-fit text-left text-xs font-normal bg-slate-100 rounded" key={item.timestamp}>
                            { item.text }
                          </div>
                        );
                      }) }
                      <div className="mx-1 px-1 w-auto text-left text-xs font-medium text-slate-400">
                        { `${message_group.name} (You)` }
                      </div>
                    </div>
                  </React.Fragment>
                );
              }
              return (
                <React.Fragment key={message_group_index}>
                  <div className="p-1 border-l-4 border-indigo-200">
                    { message_group.messages.map((item) => {
                      return (
                        <div className="m-1 p-1 w-fit text-left text-xs font-normal bg-indigo-100 rounded" key={item.timestamp}>
                          { item.text }
                        </div>
                      );
                    }) }
                    <div className="mx-1 px-1 w-auto text-left text-xs font-medium text-indigo-400">
                      { message_group.name }
                    </div>
                  </div>
                </React.Fragment>
              );
            }) }

          </div>

          { connected === true && (
            <React.Fragment>
              <div className="m-1 p-1 w-full">
                <div className="mx-1 px-1 w-auto text-left text-xs font-medium text-slate-400">
                  { `Active users (${users.length}) : ${users.join(', ')}` }
                </div>
              </div>
            </React.Fragment>
          ) }

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
                    ref={name_input_ref}
                    className="w-full"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => set_name(e.target.value)}
                    disabled={connected === false || accepted === true}
                    autoFocus={true}
                  />
                </div>
                <div className="p-1 w-full sm:w-32">
                  <button type="submit" disabled={connected === false || accepted === true }>
                    Join
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mx-1 px-1 w-full">
            <form
              className="w-full flex flex-col sm:flex-row justify-start items-center"
              onSubmit={(e) => {
                e.preventDefault();
                queueMicrotask(send);
              }}
            >
              <div className="p-1 w-full sm:flex-grow">
                <input
                  ref={message_input_ref}
                  className="w-full"
                  type="text"
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => set_message(e.target.value)}
                  disabled={connected === false || accepted === false}
                  autoFocus={true}
                />
              </div>
              <div className="p-1 w-full sm:w-32">
                <button type="submit" disabled={connected === false || accepted === false}>
                  Send
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WebSocketChat;