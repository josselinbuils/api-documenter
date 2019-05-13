import React, { FC } from 'react';
import { getType } from '../../../utils';
import { TableCell } from './TableCell';

export const TypeCell: FC<Props> = ({ input }) => {
  const type = getType(input);
  return <TableCell>{type && `\`${type}\``}</TableCell>;
};

interface Props {
  input: any;
}
