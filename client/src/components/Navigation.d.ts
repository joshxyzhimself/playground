import * as React from 'react';
import * as useHistory from 'modules/useHistory';
export interface props {
  history: useHistory.history;
  session: string;
  set_session: React.Dispatch<string>;
}
export type Navigation = (props: props) => JSX.Element;
export const Navigation: Navigation;
export default Navigation;