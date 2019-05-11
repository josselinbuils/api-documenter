import * as React from 'react';

export const TableHead: React.FC = ({ children }) => (
  <>
    {children}
    {'|\n'}
    {React.Children.map(children, () => '| --- ')}
    {'|'}
  </>
);
