import React, { FC } from 'react';

export const TableCell: FC = ({ children }) => (
  <>
    {'| '}
    {children}{' '}
  </>
);
