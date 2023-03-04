// @ts-check

import React from 'react';
import Link from './Link';
import './Navigation.css';

export const Navigation = (props) => {
  const { history, session, set_session } = props;
  return (
    <div className="m-2 p-2 border-y border-slate-200 flex flex-row justify-center items-center gap-2">
      <Link history={history} href="/">
        <div className="navigation-button" tabIndex={-1}>
          Home
        </div>
      </Link>
      <Link history={history} href="/dashboard">
        <div className="navigation-button" tabIndex={-1}>
          Dashboard
        </div>
      </Link>
      { typeof session === 'string' ? (
        <React.Fragment>
          <Link history={history} href="/example">
            <div className="navigation-button" tabIndex={-1}>
              Example
            </div>
          </Link>
          <div
            className="navigation-button"
            tabIndex={-1}
            onClick={() => {
              history.push('/sign-in');
              set_session(null);
            }}
          >
            Sign out
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Link history={history} href="/sign-in">
            <div className="navigation-button" tabIndex={-1}>
              Sign in
            </div>
          </Link>
        </React.Fragment>
      ) }
    </div>
  );
};

export default Navigation;
