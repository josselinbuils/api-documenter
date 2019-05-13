import {
  ApiDocumentedItem,
  ApiFunction,
  ApiParameterListMixin
} from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { getCommentText, getType } from '../../utils';
import { Title } from '../components';
import { ParameterTable } from './components';

export const FunctionContent: FC<Props> = ({ apiFunction }) => {
  const returnType = getType(apiFunction);
  const returnsBlock =
    apiFunction.tsdocComment && apiFunction.tsdocComment.returnsBlock;

  return (
    <>
      <ParameterTable
        apiParameterListMixin={apiFunction as ApiParameterListMixin}
      />
      <Title level={2}>Returns</Title>
      {returnType && `\n\n\`${getType(apiFunction)}\``}
      {returnsBlock && `\n\n${getCommentText(returnsBlock.content)}`}
    </>
  );
};

interface Props {
  apiFunction: ApiFunction & ApiDocumentedItem & ApiParameterListMixin;
}
