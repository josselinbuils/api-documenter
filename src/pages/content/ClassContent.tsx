import { ApiClass, ApiItemKind } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { filterApiItems, getEventItems, getPropertyItems } from '../../utils';
import { MemberTable, TypedMemberTable } from './components';

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
