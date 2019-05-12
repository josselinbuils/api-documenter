import React, { FC } from 'react';
import { TableCell } from './TableCell';
import { getType } from '../../../../utils';

export const TypeCell: FC<Props> = ({ input }) => {
  const type = getType(input);
  return <TableCell>{type && `\`${type}\``}</TableCell>;
};

interface Props {
  input: any;
}
