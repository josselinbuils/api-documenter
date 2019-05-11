import { ApiItem, ApiItemKind } from '@microsoft/api-extractor-model';
import { getApiItemFilenameLink } from '../utils';
import * as React from 'react';
import { Link } from './Link';
import { PackageName } from '@microsoft/node-core-library';

const excludedItemKinds = [ApiItemKind.Model, ApiItemKind.EntryPoint];

const LinkSeparator = () => ' > ';

export const Breadcrumb: React.FC<Props> = ({ apiItem }) => {
  const hierarchyItems = apiItem
    .getHierarchy()
    .filter(item => !excludedItemKinds.includes(item.kind));

  if (hierarchyItems.length < 2) {
    return null;
  }

  return (
    <>
      {hierarchyItems.map((apiItem, index) => (
        <>
          {index > 0 && <LinkSeparator />}
          <Link href={getApiItemFilenameLink(apiItem)}>
            {apiItem.kind === ApiItemKind.Package
              ? PackageName.getUnscopedName(apiItem.displayName)
              : apiItem.displayName}
          </Link>
        </>
      ))}
    </>
  );
};

interface Props {
  apiItem: ApiItem;
}
