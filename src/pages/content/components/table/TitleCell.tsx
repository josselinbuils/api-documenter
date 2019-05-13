import { ApiItem } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { PAGE_ITEM_KINDS } from '../../../../constants';
import { Link } from '../../../components';
import { getApiItemFilenameLink } from '../../../utils';
import { TableCell } from './TableCell';

export const TitleCell: FC<Props> = ({ apiItem }) => (
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
