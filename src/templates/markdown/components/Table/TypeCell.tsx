import React, { FC } from 'react';
import { getType } from '../../../utils/getType';
import { removeConsecutiveSpaces } from '../../utils/removeConsecutiveSpaces';
import { TableCell } from './TableCell';

export const TypeCell: FC<Props> = ({ input }) => {
  const type = removeConsecutiveSpaces(getType(input) || '')
    .trim()
    // Removes line breaks to avoid breaking arrays
    .replace(/\n/g, '')
    // Replaces | by ǀ to avoid breaking arrays
    .replace(/\|/g, 'ǀ')
    // Uses non-breaking spaces
    .replace(/ /g, '\u00A0');

  return <TableCell>{type && `\`${type}\``}</TableCell>;
};

interface Props {
  input: any;
}
