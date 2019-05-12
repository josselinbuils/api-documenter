import {
  ApiItem,
  ApiItemKind,
  ApiPackage
} from '@microsoft/api-extractor-model';
import * as React from 'react';
import { Breadcrumb } from './components';
import { PackagePage } from './PackagePage';
import { PackageElementPage } from './PackageElementPage';

export const Page: React.FC<Props> = ({ apiItem }) => (
  <>
    {
      '<!-- Do not edit this file. It is automatically generated by API Documenter. -->'
    }
    <Breadcrumb apiItem={apiItem} />
    {apiItem.kind === ApiItemKind.Package ? (
      <PackagePage apiPackage={apiItem as ApiPackage} />
    ) : (
      <PackageElementPage apiItem={apiItem} />
    )}
    {'\n'}
  </>
);

interface Props {
  apiItem: ApiItem;
}
