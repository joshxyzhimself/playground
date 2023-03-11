// @ts-check

import React from 'react';
import ApexChart from 'react-apexcharts';
import Spinner from '../components/Spinner';


/**
 * @type {import('./TraderDashboard').TraderDashboard}
 */
export const TraderDashboard = (props) => {
  const { history } = props;
  /**
   * @type {import('./TraderDashboard').NetworkInfoState}
   */
  const [network_info, set_network_info] = React.useState(null);
  /**
   * @type {import('./TraderDashboard').MarketCandlesState}
   */
  const [market_candles, set_market_candles] = React.useState(null);
  /**
   * @type {import('./TraderDashboard').ExchangeRatesState}
   */
  const [local_rates, set_local_rates] = React.useState(null);
  /**
   * @type {import('./TraderDashboard').State<string>}
   */
  const [local_rate_filter, set_local_rate_filter] = React.useState('');
  /**
   * @type {import('./TraderDashboard').ExchangeRatesState}
   */
  const [forex_rates, set_forex_rates] = React.useState(null);
  /**
   * @type {import('./TraderDashboard').State<string>}
   */
  const [forex_rate_filter, set_forex_rate_filter] = React.useState('');
  React.useEffect(() => {
    queueMicrotask(async () => {
      const response = await fetch('/api/trader-dashboard/ip-info');
      const data = await response.json();
      set_network_info(data);
    });
    queueMicrotask(async () => {
      // https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproductcandles
      const response = await fetch('/api/trader-dashboard/btc-usd-candles');
      const data = await response.json();
      if (data instanceof Array) {
        /**
         * @type {import('./TraderDashboard').MarketCandle[]}
         */
        const next_market_candles = [];
        data.forEach((item) => {
          if (item instanceof Array && item.length === 6) {
            const timestamp = item[0] * 1000;
            const low = item[1];
            const high = item[2];
            const open = item[3];
            const close = item[4];
            const volume = item[5];
            /**
             * @type {import('./TraderDashboard').MarketCandle}
             */
            const market_candle = { timestamp, open, high, low, close, volume };
            next_market_candles.push(market_candle);
          }
        });
        // next_market_candles.reverse();
        set_market_candles(next_market_candles.slice(0, 180));
      }
    });
    queueMicrotask(async () => {
      const response = await fetch('/api/trader-dashboard/local-exchange-rates');
      const data = await response.json();
      if (data instanceof Object) {
        if (data.markets instanceof Array) {
          /**
           * @type {import('./TraderDashboard').ExchangeRate[]}
           */
          const next_local_rates = [];
          data.markets.forEach((market) => {
            if (market instanceof Object && typeof market.product === 'string') {
              const base = market.product;
              const quote = market.currency;
              const bid = Number(market.bid);
              const ask = Number(market.ask);
              const mid = (bid + ask) / 2;
              /**
               * @type {import('./TraderDashboard').ExchangeRate}
               */
              const local_rate = { base, quote, mid };
              next_local_rates.push(local_rate);
            }
          });
          set_local_rates(next_local_rates);
        }
      }
    });
    queueMicrotask(async () => {
      const response = await fetch('/api/trader-dashboard/foreign-exchange-rates');
      const data = await response.json();
      if (data instanceof Object) {
        if (data.rates instanceof Object) {
          /**
           * @type {import('./TraderDashboard').ExchangeRate[]}
           */
          const next_forex_rates = [];
          Array.from(Object.entries(data.rates)).forEach((entry) => {
            if (entry instanceof Object && typeof entry[0] === 'string' && typeof entry[1] === 'number') {
              const base = 'USD';
              const quote = entry[0];
              const mid = entry[1];
              /**
               * @type {import('./TraderDashboard').ExchangeRate}
               */
              const forex_rate = { base, quote, mid };
              next_forex_rates.push(forex_rate);
            }
          });
          set_forex_rates(next_forex_rates);
        }
      }
    });
  }, []);

  return (
    <div style={{ padding: 8 }}>
      <div className="p-4">

        <div className="p-1 text-left text-2xl font-medium">
          Trader Dashboard
        </div>

        <div className="p-1 w-full sm:w-3/4 md:w-2/3 text-left text-base font-light">
          Shows your current network information, the latest BTC-USD candlestick charts, and the latest intra-day mid-market rates for both local crypto markets and foreign fiat markets.
        </div>

        <div className="p-1 text-left text-xs font-light">
          Uses third-party API&apos;s from IPInfo, Coinbase, Coins PH, and Open Exchange Rates.
        </div>

        <div className="p-1 flex flex-row justify-start items-start flex-wrap">

          <div className="p-1 h-full w-full md:w-1/3">
            <div className="p-1 h-full bg-slate-50 border border-slate-400 rounded">
              <div className="p-1 text-left text-base font-normal">
                Network Information
              </div>
              { network_info === null && (<Spinner />) }
              { network_info instanceof Object && (
                <React.Fragment>

                  <div className="h-64 overflow-y-auto">
                    <div className="w-full p-1">
                      <div className="p-1 bg-slate-800 rounded" >
                        <div className="ubuntu-mono text-right text-base font-normal text-white">
                          { network_info.ip }
                        </div>
                        <div className="ubuntu-mono text-right text-xs font-light text-slate-50">
                          IP Address
                        </div>
                      </div>
                    </div>

                    <div className="w-full p-1">
                      <div className="p-1 bg-slate-800 rounded" >
                        <div className="ubuntu-mono text-right text-base font-normal text-white">
                          { network_info.hostname }
                        </div>
                        <div className="ubuntu-mono text-right text-xs font-light text-slate-50">
                          Host Name
                        </div>
                      </div>
                    </div>

                    <div className="w-full p-1">
                      <div className="p-1 bg-slate-800 rounded" >
                        <div className="ubuntu-mono text-right text-base font-normal text-white">
                          { network_info.city }
                        </div>
                        <div className="ubuntu-mono text-right text-xs font-light text-slate-50">
                          City
                        </div>
                      </div>
                    </div>

                    <div className="w-full p-1">
                      <div className="p-1 bg-slate-800 rounded" >
                        <div className="ubuntu-mono text-right text-base font-normal text-white">
                          { network_info.region }
                        </div>
                        <div className="ubuntu-mono text-right text-xs font-light text-slate-50">
                          Region
                        </div>
                      </div>
                    </div>

                    <div className="w-full p-1">
                      <div className="p-1 bg-slate-800 rounded" >
                        <div className="ubuntu-mono text-right text-base font-normal text-white">
                          { network_info.country }
                        </div>
                        <div className="ubuntu-mono text-right text-xs font-light text-slate-50">
                          Country
                        </div>
                      </div>
                    </div>

                    <div className="w-full p-1">
                      <div className="p-1 bg-slate-800 rounded" >
                        <div className="ubuntu-mono text-right text-base font-normal text-white">
                          { network_info.loc }
                        </div>
                        <div className="ubuntu-mono text-right text-xs font-light text-slate-50">
                          Location
                        </div>
                      </div>
                    </div>

                    <div className="w-full p-1">
                      <div className="p-1 bg-slate-800 rounded" >
                        <div className="ubuntu-mono text-right text-base font-normal text-white">
                          { network_info.org }
                        </div>
                        <div className="ubuntu-mono text-right text-xs font-light text-slate-50">
                          Organization
                        </div>
                      </div>
                    </div>

                    <div className="w-full p-1">
                      <div className="p-1 bg-slate-800 rounded" >
                        <div className="ubuntu-mono text-right text-base font-normal text-white">
                          { network_info.postal }
                        </div>
                        <div className="ubuntu-mono text-right text-xs font-light text-slate-50">
                          Postal Code
                        </div>
                      </div>
                    </div>

                    <div className="w-full p-1">
                      <div className="p-1 bg-slate-800 rounded" >
                        <div className="ubuntu-mono text-right text-base font-normal text-white">
                          { network_info.timezone }
                        </div>
                        <div className="ubuntu-mono text-right text-xs font-light text-slate-50">
                          Time Zone
                        </div>
                      </div>
                    </div>

                  </div>

                </React.Fragment>
              ) }
            </div>
          </div>

          <div className="p-1 h-full w-full md:w-2/3">
            <div className="p-1 h-full bg-slate-50 border border-slate-400 rounded">
              <div className="p-1 text-left text-base font-normal">
                Coinbase BTC-USD 1D Chart
              </div>
              { market_candles === null && (<Spinner />) }
              { market_candles instanceof Object && (
                <React.Fragment>
                  <div className="h-64">
                    <ApexChart
                      options={{
                        chart: { type: 'candlestick' },
                        xaxis: { type: 'datetime' },
                        yaxis: { tooltip: { enabled: true } },
                      }}
                      series={[{
                        data: market_candles.map((candle) => {
                          return {
                            x: new Date(candle.timestamp),
                            y: [candle.open, candle.high, candle.low, candle.close],
                          };
                        }),
                      }]}
                      type="candlestick"
                      height='100%'
                    />
                  </div>
                </React.Fragment>
              ) }
            </div>
          </div>

          <div className="p-1 h-full w-full md:w-1/2">
            <div className="p-1 h-full bg-slate-50 border border-slate-400 rounded">
              <div className="p-1 text-left text-base font-normal">
                Local Crypto Exchange Rates
              </div>
              { local_rates === null && (<Spinner />) }
              { local_rates instanceof Object && (
                <React.Fragment>
                  <div className="p-1 text-left text-xs font-light">
                    Intra-day mid-market rates with PHP as quote currency.
                  </div>
                  <div className="p-1">
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="Filter by base currency"
                        value={local_rate_filter}
                        onChange={(e) => set_local_rate_filter(e.target.value)}
                        autoCapitalize="off"
                        autoComplete="off"
                        spellCheck={false}
                        autoFocus={false}
                        required={false}
                      />
                    </div>
                  </div>
                  <div className="p-1 flex flex-row flex-wrap justify-start items-start">
                    { local_rates
                      .filter((local_rate) => {
                        if (local_rate.quote.toLowerCase() === 'php') {
                          return true;
                        }
                        return false;
                      })
                      .filter((local_rate) => {
                        if (local_rate_filter.length > 0) {
                          return local_rate.base.toLowerCase().includes(local_rate_filter.toLowerCase()) === true;
                        }
                        return true;
                      })
                      .map((local_rate) => (
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-1" key={`local_rate-${local_rate.base}-${local_rate.quote}`}>
                          <div className="p-1 bg-slate-800 rounded" >
                            <div className="ubuntu-mono text-right text-base font-normal text-white">
                              { local_rate.mid }
                            </div>
                            <div className="ubuntu-mono text-right text-xs font-light text-slate-50">
                              { `${local_rate.base}/${local_rate.quote}` }
                            </div>
                          </div>
                        </div>
                      )) }
                  </div>
                </React.Fragment>
              ) }
            </div>
          </div>

          <div className="p-1 h-full w-full md:w-1/2">
            <div className="p-1 h-full bg-slate-50 border border-slate-400 rounded">
              <div className="p-1 text-left text-base font-normal">
                Foreign Fiat Exchange Rates
              </div>
              { forex_rates === null && (<Spinner />) }
              { forex_rates instanceof Object && (
                <React.Fragment>
                  <div className="p-1 text-left text-xs font-light">
                    Intra-day mid-market rates with USD as base currency.
                  </div>
                  <div className="p-1">
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="Filter by quote currency"
                        value={forex_rate_filter}
                        onChange={(e) => set_forex_rate_filter(e.target.value)}
                        autoCapitalize="off"
                        autoComplete="off"
                        spellCheck={false}
                        autoFocus={false}
                        required={false}
                      />
                    </div>
                  </div>
                  <div className="p-1 flex flex-row flex-wrap justify-start items-start">
                    { forex_rates
                      .filter((forex_rate) => {
                        if (forex_rate_filter.length > 0) {
                          return forex_rate.quote.toLowerCase().includes(forex_rate_filter.toLowerCase()) === true;
                        }
                        return true;
                      })
                      .map((forex_rate) => (
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-1" key={`forex_rate-${forex_rate.base}-${forex_rate.quote}`}>
                          <div className="p-1 bg-slate-800 rounded" >
                            <div className="ubuntu-mono text-right text-base font-normal text-white">
                              { forex_rate.mid }
                            </div>
                            <div className="ubuntu-mono text-right text-xs font-light text-slate-50">
                              { `${forex_rate.base}/${forex_rate.quote}` }
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

export default TraderDashboard;