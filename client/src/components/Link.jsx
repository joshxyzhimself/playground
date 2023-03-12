// @ts-check

import React from 'react';

/**
 * @type {import('./Link').Link}
 */
export const Link = (props) => {
  const { className, children, history, target, href } = props;
  const inferred_target = target || '_self';
  return (
    <a
      className={className || ''}
      target={inferred_target}
      href={href}
      onClick={(e) => {
        if (href.substring(0, 1) === '/') {
          if (inferred_target === '_self') {
            e.preventDefault();
            history.push(href);
          }
        }
      }}
      tabIndex={-1}
      rel="noreferrer noopener"
    >
      { children }
    </a>
  );
};

export default Link;
