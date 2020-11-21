import { ApiItem } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { PAGE_ITEM_KINDS } from '../../../../constants';
import { getApiItemLink } from '../../utils/getApiItemLink';
import { Link } from '../Link';
import { TableCell } from './TableCell';

export const TitleCell: FC<Props> = ({ apiItem }) => (
  <TableCell>
    {PAGE_ITEM_KINDS.includes(apiItem.kind) ? (
      <Link href={getApiItemLink(apiItem)}>{apiItem.displayName}</Link>
    ) : (
      apiItem.displayName
    )}
  </TableCell>
);

interface Props {
  apiItem: ApiItem;
}
