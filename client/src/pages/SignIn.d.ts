import * as React from 'react';
import * as useHistory from 'modules/useHistory';
export interface props {
  history: useHistory.history;
  set_session: React.Dispatch<string>;
}
export type SignIn = (props: props) => JSX.Element;
export const SignIn: SignIn;
export default SignIn;