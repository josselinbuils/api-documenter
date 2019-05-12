import { ApiItem, ApiPropertyItem } from '@microsoft/api-extractor-model';
import * as React from 'react';
import { TableCell } from './TableCell';

export const TypeCell: React.FC<Props> = ({ apiItem }) => (
  <TableCell>
    {apiItem instanceof ApiPropertyItem && apiItem.propertyTypeExcerpt.text}
  </TableCell>
);

interface Props {
  apiItem: ApiItem;
}
