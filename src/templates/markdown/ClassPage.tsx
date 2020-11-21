import { ApiClass, ApiItemKind } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { filterApiItems } from '../utils/filterApiItems';
import { getEventItems } from '../utils/getEventItems';
import { getPropertyItems } from '../utils/getPropertyItems';
import { Constructor } from './components/Constructor';
import { Description } from './components/Description';
import { Examples } from './components/Examples';
import { MemberTable } from './components/MemberTable';
import { PageHeader } from './components/PageHeader';
import { Signature } from './components/Signature';
import { TypedMemberTable } from './components/TypedMemberTable';
import { Warnings } from './components/Warnings/Warnings';

export const ClassPage: FC<Props> = ({ apiClass }) => (
  <>
    <PageHeader apiItem={apiClass} />
    <Warnings apiItem={apiClass} />
    <Description apiItem={apiClass} />
    <Signature apiItem={apiClass} />
    <Constructor apiClass={apiClass} />
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
