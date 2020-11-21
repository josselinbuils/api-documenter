import { ApiFunction } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { Description } from './components/Description';
import { Examples } from './components/Examples';
import { PageHeader } from './components/PageHeader';
import { ParameterTable } from './components/ParameterTable';
import { Returns } from './components/Returns';
import { Signature } from './components/Signature';
import { Title } from './components/Title';
import { Warnings } from './components/Warnings/Warnings';

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
