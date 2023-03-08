// @ts-check

import React from 'react';
import Link from './Link';
import './Navigation.css';

export const Navigation = (props) => {
  const { history, session, set_session } = props;
  return (
    <div className="m-2 p-2 border-y border-slate-200 flex flex-row flex-wrap justify-center items-center gap-2">
      <Link className="navigation-button" history={history} href="/">
        Home
      </Link>
      <Link className="navigation-button" history={history} href="/trader-dashboard">
        Trader Dashboard
      </Link>
      <Link className="navigation-button" history={history} href="/jwt-encoder">
        JWT Encoder
      </Link>
      <Link className="navigation-button" history={history} href="/jwt-decoder">
        JWT Decoder
      </Link>
      <Link className="navigation-button" history={history} href="/image-uploader">
        Image Uploader
      </Link>
    </div>
  );
};

export default Navigation;
