// @ts-check

import React from 'react';

/**
 * @type {import('./Home').Home}
 */
export const Home = () => {
  return (
    <div style={{ padding: 8 }}>
      <div className="p-4">
        <div className="p-1 text-left text-2xl font-medium">
          Hi there, welcome to the playground.
        </div>
        <div className="p-1 text-left text-base font-light">
          Here you will find mini projects that I&apos;ve crafted for demonstration purposes.
        </div>
        <div className="p-1 text-left text-base font-light">
          Each project will have a name, description, and link.
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
          Each project has a name, description, and list of technologies used.
        </div>
        <div className="px-1 py-4">
          <hr />
        </div>
        <div className="p-1 text-left text-xs font-light">
          Crafted with madness by @joshxyzhimself.
        </div>
      </div>
    </div>
  );
};

export default Home;