import { ApiEnum } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { Description } from './components/Description';
import { EnumMemberTable } from './components/EnumMemberTable';
import { PageHeader } from './components/PageHeader';
import { Signature } from './components/Signature';
import { Warnings } from './components/Warnings/Warnings';

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
