import { ApiDocumentedItem, ApiItem } from '@microsoft/api-extractor-model';
import { StandardTags } from '@microsoft/tsdoc';
import React, { FC, Fragment } from 'react';
import { nodesToMarkdown } from '../utils';
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
  const useNumbers = exampleBlocks.length > 1;

  return exampleBlocks.length > 0 ? (
    <>
      {exampleBlocks.map((exampleBlock, index) => (
        <Fragment key={index}>
          <Title level={2}>Example{useNumbers ? ` ${index + 1}` : ''}</Title>
          {'\n\n'}
          {nodesToMarkdown(exampleBlock.content.nodes)}
        </Fragment>
      ))}
    </>
  ) : null;
};

interface Props {
  apiItem: ApiItem | ApiDocumentedItem;
}
