import {
  ApiFunction,
  ApiParameterListMixin
} from '@microsoft/api-extractor-model';
import * as React from 'react';
import { ParameterTable } from './components';

export const FunctionContent: React.FC<Props> = ({ apiFunction }) => (
  <ParameterTable
    apiParameterListMixin={apiFunction as ApiParameterListMixin}
  />
);

interface Props {
  apiFunction: ApiFunction;
}
