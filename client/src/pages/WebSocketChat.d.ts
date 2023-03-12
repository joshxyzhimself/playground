import * as useHistory from 'modules/useHistory';

export type State<T> = [T, React.Dispatch<T>];

export interface message {
  name: string;
  text: string;
  timestamp: number;
}

export interface props {
  history: useHistory.history;
}

export type WebSocketChat = (props: props) => JSX.Element;
export const WebSocketChat: WebSocketChat;
export default WebSocketChat;