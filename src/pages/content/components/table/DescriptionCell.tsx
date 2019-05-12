import { ApiDocumentedItem, ApiItem } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { getCommentText } from '../../../../utils';
import { TableCell } from './TableCell';

export const DescriptionCell: FC<Props> = ({ apiItem }) => (
  <TableCell>
    {getCommentText((apiItem as ApiDocumentedItem).tsdocComment, true)}
  </TableCell>
);

interface Props {
  apiItem: ApiItem;
}
