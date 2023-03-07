import * as useHistory from 'modules/useHistory';

export type State<T> = [T, React.Dispatch<T>];

export interface props {
  history: useHistory.history;
}

export type JwtEncoder = (props: props) => JSX.Element;
export const JwtEncoder: JwtEncoder;
export default JwtEncoder;