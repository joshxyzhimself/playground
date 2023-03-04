// @ts-check

import React from 'react';
import Link from '../components/Link';

/**
 * @type {import('./Dashboard').Dashboard}
 */
export const Dashboard = (props) => {
  const { history } = props;
  const [network_info, set_network_info] = React.useState(null);
  React.useEffect(() => {
    queueMicrotask(async () => {
      const response = await fetch('https://ipinfo.io/json?token=24685cdbd4a1ac');
      const response_json = await response.json();
      set_network_info(response_json);
    });
  }, []);
  return (
    <div style={{ padding: 8 }}>
      <div className="p-4">
        <div className="p-1 text-left text-2xl font-medium">
          Dashboard
        </div>
        <div className="p-1 text-left text-base font-light">
          Network Information
        </div>
        { network_info instanceof Object && (
          <div>
            <div className="px-1 text-left text-xs font-light">
              { `IP Address: ${network_info.ip}` }
            </div>
            <div className="px-1 text-left text-xs font-light">
              { `Hostname: ${network_info.hostname}` }
            </div>
            <div className="px-1 text-left text-xs font-light">
              { `City: ${network_info.city}` }
            </div>
            <div className="px-1 text-left text-xs font-light">
              { `Region: ${network_info.region}` }
            </div>
            <div className="px-1 text-left text-xs font-light">
              { `Country: ${network_info.country}` }
            </div>
            <div className="px-1 text-left text-xs font-light">
              { `Location: ${network_info.loc}` }
            </div>
            <div className="px-1 text-left text-xs font-light">
              { `Organization: ${network_info.org}` }
            </div>
            <div className="px-1 text-left text-xs font-light">
              { `Postal Code: ${network_info.postal}` }
            </div>
            <div className="px-1 text-left text-xs font-light">
              { `Time Zone: ${network_info.timezone}` }
            </div>
          </div>
        ) }
        <div className="p-1 text-left text-base font-light">
          Exchange Rates
        </div>
        <div className="px-1 py-4">
          <hr />
        </div>
        <div className="p-1 text-left text-xs font-light">
          Crafted by @joshxyzhimself.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;