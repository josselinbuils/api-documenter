import React, { FC } from 'react';

export const ColumnHead: FC = ({ children }) => (
  <>
    {'| '}
    {children}{' '}
  </>
);
