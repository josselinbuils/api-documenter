import { ApiItem, ApiItemKind } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { DOCUMENTATION_TITLE } from '../constants';
import { filterApiItems, getChildren } from '../utils';
import { Title } from './components';
import { MemberTable } from './content/components';

export const NamespacePage: FC<Props> = ({ apiItem }) => {
  const children = getChildren(apiItem);

  const title =
    apiItem.kind === ApiItemKind.Package
      ? DOCUMENTATION_TITLE
      : apiItem.getScopedNameWithinPackage();

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
      <Title>{title}</Title>
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
