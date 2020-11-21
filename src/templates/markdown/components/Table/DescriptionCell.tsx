import { ApiDocumentedItem, ApiItem } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { CommentContent } from '../CommentContent';
import { TableCell } from './TableCell';

export const DescriptionCell: FC<Props> = ({ apiItem }) => {
  const { tsdocComment } = apiItem as ApiDocumentedItem;

  return (
    <TableCell>
      {tsdocComment && (
        <CommentContent docSection={tsdocComment.summarySection} inArray />
      )}
    </TableCell>
  );
};

interface Props {
  apiItem: ApiItem | ApiDocumentedItem;
}
