import { ApiDocumentedItem, ApiItem } from '@microsoft/api-extractor-model';
import { StandardTags } from '@microsoft/tsdoc';
import React, { FC, Fragment } from 'react';
import { CommentContent } from './CommentContent';
import { Title } from './Title';

export const Examples: FC<Props> = ({ apiItem }) => {
  const tsdocComment = (apiItem as ApiDocumentedItem).tsdocComment;
  const exampleBlocks = tsdocComment
    ? tsdocComment.customBlocks.filter(
        x =>
          x.blockTag.tagNameWithUpperCase ===
          StandardTags.example.tagNameWithUpperCase
      )
    : [];

  if (exampleBlocks.length === 0) {
    return null;
  }

  const useNumbers = exampleBlocks.length > 1;

  return (
    <>
      {exampleBlocks.map((exampleBlock, index) => (
        <Fragment key={index}>
          <Title level={2}>Example{useNumbers ? ` ${index + 1}` : ''}</Title>
          {'\n'}
          <CommentContent docSection={exampleBlock.content} />
          {'\n'}
        </Fragment>
      ))}
    </>
  );
};

interface Props {
  apiItem: ApiItem | ApiDocumentedItem;
}
