// @ts-check

import React from 'react';
import { useHistory } from './modules/useHistory.mjs';
import { useLocalStorage } from './modules/useLocalStorage.mjs';
import * as hs256 from './modules/hs256.mjs';

import Navigation from './components/Navigation';
import Link from './components/Link';

const Home = React.lazy(() => import('./pages/Home'));
const TraderDashboard = React.lazy(() => import('./pages/TraderDashboard'));
const JwtEncoder = React.lazy(() => import('./pages/JwtEncoder'));
const JwtDecoder = React.lazy(() => import('./pages/JwtDecoder'));
const ImageUploader = React.lazy(() => import('./pages/ImageUploader'));
const WebSocketChat = React.lazy(() => import('./pages/WebSocketChat'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const Status403 = React.lazy(() => import('./pages/Status403'));
const Status404 = React.lazy(() => import('./pages/Status404'));

import { useAudio } from 'react-use';

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
    case '/image-uploader': {
      return (<ImageUploader history={history} />);
    }
    case '/websocket-chat': {
      return (<WebSocketChat history={history} />);
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

  const [audio, state, controls] = useAudio({
    src: `${window.location.protocol}//${window.location.host}/ditto-new-jeans.mp3`,
  });

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
      <div className="pb-16">
        <React.Suspense fallback={null}>
          { content }
        </React.Suspense>
      </div>
      <div className="fixed bottom-0 w-full h-auto w-full bg-slate-50 border-t-2 border-slate-200 shadow">
        { audio }

        <div className="p-1 flex flex-row justify-between items-center">

          <div className="px-1 flex flex-row justify-start items-center">
            <div className="p-1 w-16">
              <button type="button" onClick={state.playing === false ? controls.play : controls.pause}>
                { state.playing === false ? 'play' : 'pause' }
              </button>
            </div>
            <div className="p-1">
              <div className="text-left text-sm font-bold text-slate-900">
                Ditto
              </div>
              <div className="text-left text-xs font-light text-slate-800">
                New Jeans
              </div>
            </div>
          </div>

          <Link history={history} href="https://github.com/joshxyzhimself" target="_blank">
            <div className="px-1 text-left text-xs font-normal text-slate-800">
              @joshxyzhimself
            </div>
          </Link>

        </div>

      </div>
    </div>
  );
};

export default App;
