import React, { FC } from 'react';

export const Warning: FC = ({ children }) => (
  <>
    {'\n\n> Warning: '}
    {children}
  </>
);
