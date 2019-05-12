import {
  ApiFunction,
  ApiParameterListMixin
} from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { ParameterTable } from './components';

export const FunctionContent: FC<Props> = ({ apiFunction }) => (
  <ParameterTable
    apiParameterListMixin={apiFunction as ApiParameterListMixin}
  />
);

interface Props {
  apiFunction: ApiFunction;
}
