import React, { FC } from 'react';

export const Warning: FC = ({ children }) => (
  <>
    {'\n> Warning: '}
    {children}
    {'\n'}
  </>
);
