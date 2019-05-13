import { ApiDocumentedItem, ApiItem } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { CommentContent } from './CommentContent';

export const Description: FC<Props> = ({ apiItem }) => {
  const tsdocComment = (apiItem as ApiDocumentedItem).tsdocComment;

  if (tsdocComment === undefined) {
    return null;
  }

  return (
    <>
      {'\n'}
      <CommentContent docSection={tsdocComment.summarySection} />
      {'\n'}
    </>
  );
};

interface Props {
  apiItem: ApiItem | ApiDocumentedItem;
}
