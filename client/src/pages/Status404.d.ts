import * as useHistory from 'modules/useHistory';
export interface props {
  history: useHistory.history;
}
export type Status404 = (props: props) => JSX.Element;
export const Status404: Status404;
export default Status404;