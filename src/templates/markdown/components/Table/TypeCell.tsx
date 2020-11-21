import React, { FC } from 'react';
import { getType } from '../../../utils/getType';
import { TableCell } from './TableCell';

export const TypeCell: FC<Props> = ({ input }) => {
  const type = (getType(input) || '')
    // Replaces | by ǀ to avoid breaking arrays
    .replace(/\|/g, 'ǀ')
    // Replaces line breaks by spaces to avoid breaking arrays
    .replace(/\n/g, ' ')
    // Uses non-breaking spaces
    .replace(/ /g, '\u00A0');

  return <TableCell>{type && `\`${type}\``}</TableCell>;
};

interface Props {
  input: any;
}
