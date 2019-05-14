import { ApiFunction } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { getType } from '../../utils';
import { CommentContent } from './CommentContent';

export const Returns: FC<Props> = ({ apiFunction }) => {
  const returnType = getType(apiFunction);
  const returnsBlock =
    apiFunction.tsdocComment && apiFunction.tsdocComment.returnsBlock;

  if (returnType === undefined && returnsBlock === undefined) {
    return null;
  }

  return (
    <>
      {returnType && `\n\`${getType(apiFunction)}\`\n`}
      {returnsBlock && (
        <>
          {'\n'}
          <CommentContent docSection={returnsBlock.content} />
          {'\n'}
        </>
      )}
    </>
  );
};

interface Props {
  apiFunction: ApiFunction;
}
