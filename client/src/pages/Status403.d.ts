import * as useHistory from 'modules/useHistory';
export interface props {
  history: useHistory.history;
}
export type Status403 = (props: props) => JSX.Element;
export const Status403: Status403;
export default Status403;