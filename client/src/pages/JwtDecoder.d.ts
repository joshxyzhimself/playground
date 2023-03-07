import * as useHistory from 'modules/useHistory';

export type State<T> = [T, React.Dispatch<T>];

export interface props {
  history: useHistory.history;
}

export type JwtDecoder = (props: props) => JSX.Element;
export const JwtDecoder: JwtDecoder;
export default JwtDecoder;