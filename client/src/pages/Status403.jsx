// @ts-check

import React from 'react';
import Link from '../components/Link';

/**
 * @type {import('./Status403').Status403}
 */
export const Status403 = (props) => {
  const { history } = props;
  return (
    <div style={{ padding: 8 }}>
      <div className="p-4">
        <div className="p-1 text-center text-xl font-medium">
          403
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="w-full md:w-1/2 p-2">
            <div className="p-1 text-left text-base font-medium">
              Forbidden
            </div>
            <div className="p-1 text-left text-sm font-normal">
              The server understood the request but refuses to authorize it.
            </div>
            <div className="p-1 text-left text-xs font-normal">
              { `URL pathname: ${history.pathname}` }
            </div>
            <div className="p-1 text-left text-xs font-normal">
              { `URL search: ${history.search}` }
            </div>
            <div className="p-1 text-left text-xs font-normal">
              { `URL hash: ${history.hash}` }
            </div>
            <Link history={history} href="https://httpstatuses.io/403" target="_blank">
              <div className="p-1 text-left text-xs font-normal underline">
                https://httpstatuses.io/403
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status403;