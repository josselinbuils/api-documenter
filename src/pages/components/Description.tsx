import React, { FC } from 'react';
import { getCommentText } from '../../utils';
import { ApiDocumentedItem, ApiItem } from '@microsoft/api-extractor-model';

export const Description: FC<Props> = ({ apiItem }) => {
  const tsdocComment = (apiItem as ApiDocumentedItem).tsdocComment;

  return tsdocComment !== undefined ? (
    <>
      {'\n\n'}
      {getCommentText(tsdocComment.summarySection)}
    </>
  ) : null;
};

interface Props {
  apiItem: ApiItem | ApiDocumentedItem;
}
