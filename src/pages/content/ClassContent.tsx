import { ApiClass, ApiItemKind } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { filterApiItems } from '../utils';
import { MemberTable, TypedMemberTable } from './components';
import { getEventItems, getPropertyItems } from './utils';

export const ClassContent: FC<Props> = ({ apiClass }) => (
  <>
    <TypedMemberTable category="Event" items={getEventItems(apiClass)} />
    <TypedMemberTable category="Property" items={getPropertyItems(apiClass)} />
    <MemberTable
      category="Method"
      items={filterApiItems(apiClass.members, ApiItemKind.Method)}
    />
  </>
);

interface Props {
  apiClass: ApiClass;
}
