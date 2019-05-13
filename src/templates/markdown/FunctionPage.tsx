import {
  ApiDocumentedItem,
  ApiFunction,
  ApiParameterListMixin
} from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { getCommentText, getType } from '../utils';
import {
  Description,
  Examples,
  PageHeader,
  ParameterTable,
  Signature,
  Title,
  Warnings
} from './components';

export const FunctionPage: FC<Props> = ({ apiFunction }) => {
  const returnType = getType(apiFunction);
  const returnsBlock =
    apiFunction.tsdocComment && apiFunction.tsdocComment.returnsBlock;

  return (
    <>
      <PageHeader apiItem={apiFunction} />
      <Warnings apiItem={apiFunction} />
      <Description apiItem={apiFunction} />
      <Signature apiItem={apiFunction} />
      <ParameterTable
        apiParameterListMixin={apiFunction as ApiParameterListMixin}
      />
      <Title level={2}>Returns</Title>
      {returnType && `\n\`${getType(apiFunction)}\`\n`}
      {returnsBlock && `\n${getCommentText(returnsBlock.content)}\n`}
      <Examples apiItem={apiFunction} />
    </>
  );
};

interface Props {
  apiFunction: ApiFunction & ApiDocumentedItem & ApiParameterListMixin;
}
