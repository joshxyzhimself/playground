// @ts-check

import React from 'react';
import Link from '../components/Link';

// https://unsplash.com/photos/hCb3lIB8L8E

/**
 * @type {import('./Home').Home}
 */
export const Home = (props) => {
  const { history } = props;
  return (
    <div>

      <div className="flex flex-row justify-center items-center">
        <div className="w-full sm:w-5/6 md:w-4/5 lg:w-2/3">

          <div className="py-4">
            <div className="p-1 text-left text-2xl font-bold text-black">
              Hi there, I&apos;m Josh.
            </div>
            <div className="w-full sm:w-5/6 md:w-4/6">
              <div className="p-1 text-left text-base font-light text-slate-900">
                I&apos;m experienced with design, development, testing, and releasing of web apps. I enjoy writing software that solves my own problems.
              </div>
              <div className="p-1 text-left text-base font-light text-slate-900">
                I can help you with the following:
              </div>
              <div className="p-1 text-left text-base font-light text-slate-900">
                Front-end Web Development: HTML, CSS, JavaScript, React.js; Responsive Web Design; Search Engine Optimization; Web Performance Testing.
              </div>
              <div className="p-1 text-left text-base font-light text-slate-900">
                Back-end Web Development: Node.js, Bash Scripting; Relational Databases (MySQL, PostgreSQL); NoSQL Databases (MongoDB, Redis); Search Databases (ElasticSearch, TypeSense); Cloud DNS, Compute, Storage, Networking (AWS, GCP, Azure)
              </div>
              <div className="text-left text-base font-light text-slate-900">
                I have written and published spec-compliant implementations of the following:
              </div>
              <div className="text-left text-base font-light text-slate-900">
                &bull; RFC 4180 CSV (Comma-Separated Values) Parser in JavaScript
              </div>
              <div className="text-left text-base font-light text-slate-900">
                &bull; RFC 4226 HOTP (HMAC-Based One-Time Password) Module in JavaScript
              </div>
              <div className="text-left text-base font-light text-slate-900">
                &bull; RFC 6238 TOTP (Time-Based One-Time Password) Module in JavaScript
              </div>
              <div className="text-left text-base font-light text-slate-900">
                &bull; RFC 7519 JWT (JSON Web Token) HS256 Encoder & Decoder in JavaScript
              </div>
              <div className="text-left text-base font-light text-slate-900">
                &bull; Unicode Case-folding Algorithm in JavaScript
              </div>
              <div className="text-left text-base font-light text-slate-900">
                &bull; Redis Client in JavaScript
              </div>
              <div className="text-left text-base font-light text-slate-900">
                &bull; HTTP & WebSocket Server in JavaScript
              </div>
              <div className="text-left text-base font-light text-slate-900">
                &bull; PSGC (Philippine Standard Geographic Code) Parser in JavaScript
              </div>

            </div>
          </div>

          <div className="py-4">
            <div className="p-1 text-center text-base font-medium text-slate-800">
              Hereunder are mini-projects that I have made for demonstration purposes.
            </div>
            <div className="flex flex-row flex-wrap justify-start items-start">

              <div className="w-full md:w-1/2 lg:w-1/3 p-1">
                <Link history={history} href="/trader-dashboard">
                  <div className="p-2 bg-slate-800 rounded" >
                    <div className="text-left text-xl font-normal text-white">
                      Trader Dashboard
                    </div>
                    <div className="text-left text-sm font-light text-slate-50">
                      Shows your current network information, the latest BTC-USD candlestick charts, and the latest intra-day mid-market rates for both local crypto markets and foreign fiat markets.
                    </div>
                  </div>
                </Link>
              </div>

              <div className="w-full md:w-1/2 lg:w-1/3 p-1">
                <Link history={history} href="/jwt-encoder">
                  <div className="p-2 bg-slate-800 rounded" >
                    <div className="text-left text-xl font-normal text-white">
                      JWT Encoder
                    </div>
                    <div className="text-left text-sm font-light text-slate-50">
                      JSON Web Token HS256 Encoder. Encodes the header and the payload into a token, using the Base64-encoded secret.
                    </div>
                  </div>
                </Link>
              </div>

              <div className="w-full md:w-1/2 lg:w-1/3 p-1">
                <Link history={history} href="/jwt-decoder">
                  <div className="p-2 bg-slate-800 rounded" >
                    <div className="text-left text-xl font-normal text-white">
                      JWT Decoder
                    </div>
                    <div className="text-left text-sm font-light text-slate-50">
                      JSON Web Token HS256 Decoder. Decodes the header and the payload from a token, verifies the signature using the Base64-encoded secret.
                    </div>
                  </div>
                </Link>
              </div>

              <div className="w-full md:w-1/2 lg:w-1/3 p-1">
                <Link history={history} href="/image-uploader">
                  <div className="p-2 bg-slate-800 rounded" >
                    <div className="text-left text-xl font-normal text-white">
                      Image Uploader
                    </div>
                    <div className="text-left text-sm font-light text-slate-50">
                      Image uploader for modern image formats. Applies MozJPEG which improves JPEG compression efficiency achieving higher visual quality and smaller file sizes at the same time.
                    </div>
                  </div>
                </Link>
              </div>

              <div className="w-full md:w-1/2 lg:w-1/3 p-1">
                <Link history={history} href="/websocket-chat">
                  <div className="p-2 bg-slate-800 rounded" >
                    <div className="text-left text-xl font-normal text-white">
                      WebSocket Chat
                    </div>
                    <div className="text-left text-sm font-light text-slate-50">
                      WebSocket chat room. Users can set their name. Users cannot have the same name. Users are notified on who joins and leaves. Users can see who are currently in the chat room. System and User messages are displayed nicely.
                    </div>
                  </div>
                </Link>
              </div>

            </div>
          </div>

          <div className="py-4">
            <div className="p-1 text-center text-base font-medium text-slate-800">
              Technologies used
            </div>
            <div className="p-1 text-left text-base font-light">
              &bull; HTML, CSS, JavaScript - for structure, style, and control.
            </div>
            <div className="p-1 text-left text-base font-light">
              &bull; React.js - for component-based user interfaces.
            </div>
            <div className="p-1 text-left text-base font-light">
              &bull; Tailwind CSS - for class-based styling.
            </div>
            <div className="p-1 text-left text-base font-light">
              &bull; ESLint - for front-end and back-end code linting.
            </div>
            <div className="p-1 text-left text-base font-light">
              &bull; Vite.js - for front-end code bundling.
            </div>
            <div className="p-1 text-left text-base font-light">
              &bull; uWebSockets.js - low-level web framework.
            </div>
            <div className="p-1 text-left text-base font-light">
              &bull; Caddy - for TLS and reverse-proxy.
            </div>
            <div className="p-1 text-left text-base font-light">
              &bull; Docker - for Node.js, PostgreSQL, and PostgREST containers.
            </div>
            <div className="p-1 text-left text-base font-light">
              &bull; Bash Scripting - for generating secrets and environment files.
            </div>
            <div className="p-1 text-left text-base font-light">
              Full open-source code is available online at
              <Link history={history} className="inline-text p-1 text-left text-base font-light underline" href="https://github.com/joshxyzhimself/playground" target="_blank">
                GitHub
              </Link>
              .
            </div>
          </div>

          <div className="py-4">
            <div className="p-1 text-center text-base font-medium text-slate-800">
              Contact
            </div>
            <div className="p-1 text-left text-base font-light">
              &bull; joshxyzhimself@gmail.com
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;