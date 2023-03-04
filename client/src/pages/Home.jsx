// @ts-check

import React from 'react';

/**
 * @type {import('./Home').Home}
 */
export const Home = () => {
  return (
    <div style={{ padding: 8 }}>
      <div className="p-4">
        <div className="p-1 text-left text-base font-bold">
          Hi there, welcome to the playground.
        </div>
        <div className="p-1 text-left text-base font-normal">
          Here you will find projects that I&apos;ve crafted for demonstration purposes.
        </div>
        <div className="p-1 text-left text-base font-normal">
          Each project has a name, description, and list of technologies used.
        </div>
        <div className="px-1 py-4">
          <hr />
        </div>
        <div className="p-1 text-left text-xs font-normal">
          Crafted with madness by @joshxyzhimself.
        </div>
      </div>
    </div>
  );
};

export default Home;