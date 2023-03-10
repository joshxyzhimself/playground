import * as useHistory from 'modules/useHistory';

export type State<T> = [T, React.Dispatch<T>];

export interface NetworkInfo {
  ip: string;
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

export interface MarketCandle {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ExchangeRate {
  base: string;
  quote: string;
  bid?: number;
  ask?: number;
  mid?: number;
}

export type NetworkInfoState = State<NetworkInfo>;
export type ExchangeRatesState = State<ExchangeRate[]>;
export type MarketCandlesState = State<MarketCandle[]>;

export interface props {
  history: useHistory.history;
}

export type TraderDashboard = (props: props) => JSX.Element;
export const TraderDashboard: TraderDashboard;
export default TraderDashboard;