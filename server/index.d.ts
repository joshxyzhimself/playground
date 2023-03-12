
// trader-dashboard
export interface item {
  data: any;
  timestamp: number;
}
export type cache = Map<string, item>

// websocket-chat
export interface message {
  name: string;
  text: string;
  timestamp: number;
}