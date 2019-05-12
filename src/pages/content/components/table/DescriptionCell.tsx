import { ApiDocumentedItem, ApiItem } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { getCommentText } from '../../../../utils';
import { TableCell } from './TableCell';

export const DescriptionCell: FC<Props> = ({ apiItem }) => {
  const tsdocComment = (apiItem as ApiDocumentedItem).tsdocComment;

  return (
    <TableCell>
      {tsdocComment !== undefined
        ? getCommentText(tsdocComment.summarySection, true)
        : ''}
    </TableCell>
  );
};

interface Props {
  apiItem: ApiItem | ApiDocumentedItem;
}
