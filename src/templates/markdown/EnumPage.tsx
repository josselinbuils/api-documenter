import { ApiEnum } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import {
  Description,
  EnumMemberTable,
  PageHeader,
  Signature,
  Warnings
} from './components';

export const EnumPage: FC<Props> = ({ apiEnum }) => (
  <>
    <PageHeader apiItem={apiEnum} />
    <Warnings apiItem={apiEnum} />
    <Description apiItem={apiEnum} />
    <Signature apiItem={apiEnum} />
    <EnumMemberTable apiEnum={apiEnum} />
  </>
);

interface Props {
  apiEnum: ApiEnum;
}
