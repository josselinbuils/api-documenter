import React, { FC } from 'react';

export const TableBody: FC = ({ children }) =>
  children !== undefined ? <>{children}</> : null;
