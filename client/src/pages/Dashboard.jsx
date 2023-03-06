// @ts-check

import React from 'react';
import Spinner from '../components/Spinner';


/**
 * @type {import('./Dashboard').Dashboard}
 */
export const Dashboard = (props) => {
  const { history } = props;
  /**
   * @type {import('./Dashboard').NetworkInfoState}
   */
  const [network_info, set_network_info] = React.useState(null);
  /**
   * @type {import('./Dashboard').ExchangeRatesState}
   */
  const [exchange_rates, set_exchange_rates] = React.useState(null);
  /**
   * @type {import('./Dashboard').State<string>}
   */
  const [exchange_rate_filter, set_exchange_rate_filter] = React.useState('');
  React.useEffect(() => {
    queueMicrotask(async () => {
      const response = await fetch('https://ipinfo.io/json?token=24685cdbd4a1ac');
      const response_json = await response.json();
      set_network_info(response_json);
    });
    queueMicrotask(async () => {
      const response = await fetch('https://openexchangerates.org/api/latest.json?prettyprint=false&app_id=647db71ea7d446d3a2bfa8b7fa18649c');
      const data = await response.json();
      if (data instanceof Object) {
        if (data.rates instanceof Object) {
          /**
           * @type {import('./Dashboard').ExchangeRate[]}
           */
          const next_exchange_rates = [];
          Array.from(Object.entries(data.rates)).forEach((entry) => {
            if (entry instanceof Object && typeof entry[0] === 'string' && typeof entry[1] === 'number') {
              const base = 'USD';
              const quote = entry[0];
              const mid = entry[1];
              /**
               * @type {import('./Dashboard').ExchangeRate}
               */
              const exchange_rate = { base, quote, mid };
              next_exchange_rates.push(exchange_rate);
            }
          });
          set_exchange_rates(next_exchange_rates);
        }
      }
    });
  }, []);

  return (
    <div style={{ padding: 8 }}>
      <div className="p-4">
        <div className="p-1 text-left text-2xl font-medium">
          Dashboard
        </div>
        <div className="p-1 flex flex-row justify-start items-start flex-wrap">

          <div className="p-1 h-64 w-full md:w-1/3 overflow-y-auto">
            <div className="p-1 h-full bg-slate-50 rounded">
              <div className="p-1 text-left text-base font-normal">
                Network Information
              </div>
              { network_info === null && (<Spinner />) }
              { network_info instanceof Object && (
                <React.Fragment>
                  <div className="px-1 text-left text-sm font-light">
                    { `IP Address: ${network_info.ip}` }
                  </div>
                  <div className="px-1 text-left text-sm font-light">
                    { `Hostname: ${network_info.hostname}` }
                  </div>
                  <div className="px-1 text-left text-sm font-light">
                    { `City: ${network_info.city}` }
                  </div>
                  <div className="px-1 text-left text-sm font-light">
                    { `Region: ${network_info.region}` }
                  </div>
                  <div className="px-1 text-left text-sm font-light">
                    { `Country: ${network_info.country}` }
                  </div>
                  <div className="px-1 text-left text-sm font-light">
                    { `Location: ${network_info.loc}` }
                  </div>
                  <div className="px-1 text-left text-sm font-light">
                    { `Organization: ${network_info.org}` }
                  </div>
                  <div className="px-1 text-left text-sm font-light">
                    { `Postal Code: ${network_info.postal}` }
                  </div>
                  <div className="px-1 text-left text-sm font-light">
                    { `Time Zone: ${network_info.timezone}` }
                  </div>
                </React.Fragment>
              ) }
            </div>
          </div>

          <div className="p-1 h-64 w-full md:w-2/3 overflow-y-auto">
            <div className="p-1 h-full bg-slate-50 rounded">
              <div className="p-1 text-left text-base font-normal">
                Exchange Rates
              </div>
              { exchange_rates === null && (<Spinner />) }
              { exchange_rates instanceof Object && (
                <React.Fragment>
                  <div className="p-1 text-left text-xs font-light">
                    Intra-day mid-market rates with USD as base currency. Displayed below are quote currencies.
                  </div>
                  <div className="p-1">
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="Filter"
                        value={exchange_rate_filter}
                        onChange={(e) => set_exchange_rate_filter(e.target.value)}
                        autoCapitalize="off"
                        autoComplete="off"
                        spellCheck={false}
                        autoFocus={false}
                        required={false}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row flex-wrap justify-start items-start">
                    { exchange_rates.filter((exchange_rate) => {
                      if (exchange_rate_filter.length > 0) {
                        return exchange_rate.quote.toLowerCase().includes(exchange_rate_filter.toLowerCase()) === true;
                      }
                      return true;
                    }).map((exchange_rate) => (
                      <div className="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-1" key={`exchange-rate-${exchange_rate.base}-${exchange_rate.quote}`}>
                        <div className="p-1 bg-slate-800 rounded" >
                          <div className="ubuntu-mono text-right text-base font-normal text-white">
                            { exchange_rate.mid }
                          </div>
                          <div className="ubuntu-mono text-right text-xs font-light text-slate-50">
                            { exchange_rate.quote }
                          </div>
                        </div>
                      </div>
                    )) }
                  </div>
                </React.Fragment>
              ) }
            </div>
          </div>

        </div>

        <div className="px-1 py-2">
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