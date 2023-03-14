
// trader-dashboard
export interface item {
  data: any;
  timestamp: number;
}
export type cache = Map<string, item>

// websocket-chat
export interface message {
  action: string; // 'message'
  name: string;
  text: string;
  timestamp: number;
  system: boolean;
  system_variant: number; // 0 = red, 1 = green
}