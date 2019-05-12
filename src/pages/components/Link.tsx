import * as React from 'react';

export const Link: React.FC<Props> = ({ children, href }) =>
  `[${children}](${href})`;

interface Props {
  href: string;
}
