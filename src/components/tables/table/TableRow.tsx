import * as React from 'react';

export const TableRow: React.FC = ({ children }) => (
  <>
    {'\n'}
    {children}
    {'|'}
  </>
);
