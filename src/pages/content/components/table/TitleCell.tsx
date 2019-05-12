import { ApiItem } from '@microsoft/api-extractor-model';
import * as React from 'react';
import { PAGE_ITEM_KINDS } from '../../../../constants';
import { getApiItemFilenameLink } from '../../../../utils';
import { Link } from '../../../components';
import { TableCell } from './TableCell';

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
