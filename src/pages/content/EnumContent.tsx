import { ApiEnum } from '@microsoft/api-extractor-model';
import * as React from 'react';
import { EnumMemberTable } from './components';

export const EnumContent: React.FC<Props> = ({ apiEnum }) => (
  <EnumMemberTable apiEnum={apiEnum} />
);

interface Props {
  apiEnum: ApiEnum;
}
