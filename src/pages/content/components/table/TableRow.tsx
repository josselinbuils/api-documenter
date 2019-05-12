import React, { FC } from 'react';

export const TableRow: FC = ({ children }) => (
  <>
    {'\n'}
    {children}
    {'|'}
  </>
);
