// @ts-check

import React from 'react';
import Link from '../components/Link';

/**
 * @type {import('./Status404').Status404}
 */
export const Status404 = (props) => {
  const { history } = props;
  return (
    <div style={{ padding: 8 }}>
      <div className="p-4">
        <div className="p-1 text-center text-xl font-medium">
          404
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="w-full md:w-1/2 p-2">
            <div className="p-1 text-left text-base font-medium">
              Not Found
            </div>
            <div className="p-1 text-left text-sm font-normal">
              The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.
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
                https://httpstatuses.io/404
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status404;