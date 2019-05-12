import { ApiEnum } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { EnumMemberTable } from './components';

export const EnumContent: FC<Props> = ({ apiEnum }) => (
  <EnumMemberTable apiEnum={apiEnum} />
);

interface Props {
  apiEnum: ApiEnum;
}
