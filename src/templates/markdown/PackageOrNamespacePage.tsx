import { ApiItem, ApiItemKind } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { filterApiItems, getChildren } from '../utils';
import { MemberTable, PageHeader } from './components';

export const PackageOrNamespacePage: FC<Props> = ({ apiItem }) => {
  const children = getChildren(apiItem);
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
      <PageHeader apiItem={apiItem} />
      {members.map(([category, apiItemKind], index) => (
        <MemberTable
          category={category}
          key={index}
          items={filterApiItems(children, apiItemKind)}
        />
      ))}
    </>
  );
};

interface Props {
  apiItem: ApiItem;
}
