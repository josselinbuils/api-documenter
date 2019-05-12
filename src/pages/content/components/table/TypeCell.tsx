import { ApiItem, ApiPropertyItem } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { TableCell } from './TableCell';

export const TypeCell: FC<Props> = ({ apiItem }) => (
  <TableCell>
    {apiItem instanceof ApiPropertyItem && apiItem.propertyTypeExcerpt.text}
  </TableCell>
);

interface Props {
  apiItem: ApiItem;
}
