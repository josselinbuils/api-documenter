import { ApiInterface, ApiItemKind } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { filterApiItems, getEventItems, getPropertyItems } from '../utils';
import {
  Description,
  MemberTable,
  PageHeader,
  Signature,
  TypedMemberTable,
  Warnings
} from './components';

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
