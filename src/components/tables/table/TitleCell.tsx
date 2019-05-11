import { ApiItem } from '@microsoft/api-extractor-model';
import * as React from 'react';
import { getApiItemFilenameLink } from '../../../utils';
import { Link } from '../../Link';
import { TableCell } from './TableCell';

export const TitleCell: React.FC<Props> = ({ apiItem }) => (
  <TableCell>
    <Link href={getApiItemFilenameLink(apiItem)}>{apiItem.displayName}</Link>
  </TableCell>
);

interface Props {
  apiItem: ApiItem;
}
