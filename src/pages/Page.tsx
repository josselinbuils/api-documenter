import { ApiItem, ApiItemKind } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { Breadcrumb } from './components';
import { NamespaceElementPage } from './NamespaceElementPage';
import { NamespacePage } from './NamespacePage';

const namespaceKinds = [ApiItemKind.Namespace, ApiItemKind.Package];

export const Page: FC<Props> = ({ apiItem }) => (
  <>
    {
      '<!-- Do not edit this file. It is automatically generated by API Documenter. -->'
    }
    <Breadcrumb apiItem={apiItem} />
    {namespaceKinds.includes(apiItem.kind) ? (
      <NamespacePage apiItem={apiItem} />
    ) : (
      <NamespaceElementPage apiItem={apiItem} />
    )}
    {'\n'}
  </>
);

interface Props {
  apiItem: ApiItem;
}
