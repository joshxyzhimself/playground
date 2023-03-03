import * as React from 'react';
import * as useHistory from '../hooks/useHistory';

export interface props {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
  history: useHistory.history;
  target?: string;
  href: string;
}

// eslint-disable-next-line no-unused-vars
export type Link = (props: props) => JSX.Element;
export const Link: Link;
export default Link;