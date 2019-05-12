import { ApiItemKind, ApiPackage } from '@microsoft/api-extractor-model';
import * as React from 'react';
import { DOCUMENTATION_TITLE } from '../constants';
import { filterApiItems } from '../utils';
import { Title } from './components';
import { MemberTable } from './content/components';

export const PackagePage: React.FC<Props> = ({ apiPackage }) => {
  const members: [string, ApiItemKind][] = [
    ['Class', ApiItemKind.Class],
    ['Enum', ApiItemKind.Enum],
    ['Interface', ApiItemKind.Interface],
    ['Namespace', ApiItemKind.Namespace],
    ['Function', ApiItemKind.Function],
    ['Type Alias', ApiItemKind.TypeAlias],
    ['Variable', ApiItemKind.Variable]
  ];

  return (
    <>
      <Title>{DOCUMENTATION_TITLE}</Title>
      {members.map(([category, apiItemKind]) => (
        <MemberTable
          category={category}
          items={filterApiItems(apiPackage.members[0].members, apiItemKind)}
        />
      ))}
    </>
  );
};

interface Props {
  apiPackage: ApiPackage;
}
