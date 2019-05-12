import { ApiInterface, ApiItemKind } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { filterApiItems, getEventItems, getPropertyItems } from '../../utils';
import { MemberTable, TypedMemberTable } from './components';

export const InterfaceContent: FC<Props> = ({ apiInterface }) => (
  <>
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
