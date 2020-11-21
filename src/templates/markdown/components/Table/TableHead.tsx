import React, { Children, FC } from 'react';

export const TableHead: FC = ({ children }) => (
  <>
    {children}
    {'|\n'}
    {Children.map(children, () => '| --- ')}|
  </>
);
