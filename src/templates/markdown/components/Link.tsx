import React, { FC } from 'react';

export const Link: FC<Props> = ({ children, href }) => (
  <>
    {'['}
    {children}
    {`](${href})`}
  </>
);

interface Props {
  href: string;
}
