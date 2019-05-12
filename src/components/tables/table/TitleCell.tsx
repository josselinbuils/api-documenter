import { ApiItem } from '@microsoft/api-extractor-model';
import * as React from 'react';
import { getApiItemFilenameLink } from '../../../utils';
import { Link } from '../../Link';
import { TableCell } from './TableCell';
import { PAGE_ITEM_KINDS } from '../../../constants';

export const TitleCell: React.FC<Props> = ({ apiItem }) => (
  <TableCell>
    {PAGE_ITEM_KINDS.includes(apiItem.kind) ? (
      <Link href={getApiItemFilenameLink(apiItem)}>{apiItem.displayName}</Link>
    ) : (
      apiItem.displayName
    )}
  </TableCell>
);

interface Props {
  apiItem: ApiItem;
}
