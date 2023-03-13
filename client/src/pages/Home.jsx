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
            <div className="p-1 text-center text-2xl font-bold text-slate-900">
              Are you looking for a Solutions Architect?
            </div>
            <div className="p-1 text-center text-base font-medium text-slate-800">
              If you are, read on and see if I&apos;m the right fit for your team.
            </div>
            <div className="p-1 text-center text-xs font-light text-slate-600">
              For a better browsing experience, press play for some music.
            </div>

          </div>
        </div>
      </div>

      <div className="p-4">

        <div className="p-1 text-left text-2xl font-medium">
          Hello there!
        </div>

        <div className="p-1 text-left text-base font-light">
          Here you may find mini-projects that I have made for demonstration purposes.
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

        </div>
        <div className="px-1 py-4">
          <hr />
        </div>
        <div className="p-1 text-left text-base font-light">
          Technologies used (so far):
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

export default Home;