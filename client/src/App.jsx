// @ts-check

import React from 'react';
import { useHistory } from './modules/useHistory.mjs';
import { useLocalStorage } from './modules/useLocalStorage.mjs';
import * as hs256 from './modules/hs256.mjs';

import Navigation from './components/Navigation';
import Home from './pages/Home';
import TraderDashboard from './pages/TraderDashboard';
import JwtEncoder from './pages/JwtEncoder';
import JwtDecoder from './pages/JwtDecoder';
import SignIn from './pages/SignIn';
import Status403 from './pages/Status403';
import Status404 from './pages/Status404';

import './App.css';

/**
 * @type {import('./App').get_content}
 */
const get_content = (history, session, set_session) => {
  switch (history.pathname) {
    case '/': {
      return (<Home history={history} />);
    }
    case '/trader-dashboard': {
      return (<TraderDashboard history={history} />);
    }
    case '/jwt-encoder': {
      return (<JwtEncoder history={history} />);
    }
    case '/jwt-decoder': {
      return (<JwtDecoder history={history} />);
    }
    case '/sign-in': {
      if (typeof session === 'string') {
        return (<Status403 history={history} />);
      }
      return (<SignIn history={history} set_session={set_session} />);
    }
    default: {
      return (<Status404 history={history} />);
    }
  }
};

const App = () => {

  const history = useHistory();

  /**
   * @type {[string, React.Dispatch<string>]}
   */
  const [session, set_session] = useLocalStorage('session', null);

  const content = get_content(history, session, set_session);

  React.useEffect(() => {
    if (typeof session === 'string') {
      try {
        const session_data = hs256.verify_nbf_exp(session);
        console.log({ session_data });
      } catch (e) {
        console.error(e);
        if (e.message === 'ERR_INVALID_TOKEN_EXPIRATION_TIME') {
          alert('Session expired, please sign-in again.');
          history.push('/sign-in');
          set_session(null);
        }
      }
    }
  }, [history, session, set_session]);

  return (
    <div className="App">
      <div className="m-4 flex flex-row justify-center items-center gap-2">
        <svg className="h-12 w-12 text-slate-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
        <div>
          <div className="text-left text-2xl font-medium text-slate-900">
            playground
          </div>
          <div className="text-left text-xs font-light text-slate-800">
            prototypes you can play with
          </div>
        </div>
      </div>
      <Navigation history={history} session={session} set_session={set_session} />
      <div>
        { content }
      </div>
    </div>
  );
};

export default App;
