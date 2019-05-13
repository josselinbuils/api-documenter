import { ApiDocumentedItem, ApiItem } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { CommentContent } from '../CommentContent';
import { TableCell } from './TableCell';

export const DescriptionCell: FC<Props> = ({ apiItem }) => {
  const tsdocComment = (apiItem as ApiDocumentedItem).tsdocComment;

  return (
    <TableCell>
      {tsdocComment && (
        <CommentContent
          docSection={tsdocComment.summarySection}
          inArray={true}
        />
      )}
    </TableCell>
  );
};

interface Props {
  apiItem: ApiItem | ApiDocumentedItem;
}
