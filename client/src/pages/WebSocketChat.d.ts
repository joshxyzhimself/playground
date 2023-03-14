import * as useHistory from 'modules/useHistory';

export type State<T> = [T, React.Dispatch<T>];

export interface message {
  action: string; // 'message'
  name: string;
  text: string;
  timestamp: number;
  system: boolean;
  system_variant: number; // 0 = red, 1 = green
}

export interface message_group {
  name: string;
  messages: message[];
  system: boolean;
  timestamp: number;
}

export interface props {
  history: useHistory.history;
}

export type WebSocketChat = (props: props) => JSX.Element;
export const WebSocketChat: WebSocketChat;
export default WebSocketChat;