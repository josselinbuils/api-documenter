import { ApiFunction } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import {
  Description,
  Examples,
  PageHeader,
  ParameterTable,
  Returns,
  Signature,
  Title,
  Warnings
} from './components';

export const FunctionPage: FC<Props> = ({ apiFunction }) => (
  <>
    <PageHeader apiItem={apiFunction} />
    <Warnings apiItem={apiFunction} />
    <Description apiItem={apiFunction} />
    <Signature apiItem={apiFunction} />
    <ParameterTable apiParameterListMixin={apiFunction} />
    <Title level={2}>Returns</Title>
    <Returns apiFunction={apiFunction} />
    <Examples apiItem={apiFunction} />
  </>
);

interface Props {
  apiFunction: ApiFunction;
}
