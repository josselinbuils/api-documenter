import { ApiClass, ApiItemKind } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { filterApiItems, getEventItems, getPropertyItems } from '../utils';
import {
  Description,
  Examples,
  MemberTable,
  PageHeader,
  Signature,
  TypedMemberTable,
  Warnings
} from './components';

export const ClassPage: FC<Props> = ({ apiClass }) => (
  <>
    <PageHeader apiItem={apiClass} />
    <Warnings apiItem={apiClass} />
    <Description apiItem={apiClass} />
    <Signature apiItem={apiClass} />
    <TypedMemberTable category="Event" items={getEventItems(apiClass)} />
    <TypedMemberTable category="Property" items={getPropertyItems(apiClass)} />
    <MemberTable
      category="Method"
      items={filterApiItems(apiClass.members, ApiItemKind.Method)}
    />
    <Examples apiItem={apiClass} />
  </>
);

interface Props {
  apiClass: ApiClass;
}
