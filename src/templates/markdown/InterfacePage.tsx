import { ApiInterface, ApiItemKind } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { filterApiItems } from '../utils/filterApiItems';
import { getEventItems } from '../utils/getEventItems';
import { getPropertyItems } from '../utils/getPropertyItems';
import { Description } from './components/Description';
import { MemberTable } from './components/MemberTable';
import { PageHeader } from './components/PageHeader';
import { Signature } from './components/Signature';
import { TypedMemberTable } from './components/TypedMemberTable';
import { Warnings } from './components/Warnings/Warnings';

export const InterfacePage: FC<Props> = ({ apiInterface }) => (
  <>
    <PageHeader apiItem={apiInterface} />
    <Warnings apiItem={apiInterface} />
    <Description apiItem={apiInterface} />
    <Signature apiItem={apiInterface} />
    <TypedMemberTable category="Event" items={getEventItems(apiInterface)} />
    <TypedMemberTable
      category="Property"
      items={getPropertyItems(apiInterface)}
    />
    <MemberTable
      category="Method"
      items={filterApiItems(apiInterface.members, ApiItemKind.Method)}
    />
  </>
);

interface Props {
  apiInterface: ApiInterface;
}
