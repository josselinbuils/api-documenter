import { ApiItem, ApiItemKind } from '@microsoft/api-extractor-model';
import { PackageName } from '@microsoft/node-core-library';
import { DOCUMENTATION_TITLE } from '../constants';
import { getApiItemFilenameLink } from '../utils';
import * as React from 'react';
import { Link } from './Link';

const excludedItemKinds = [ApiItemKind.Model, ApiItemKind.EntryPoint];

const LinkSeparator = () => ' > ';

export const Breadcrumb: React.FC<Props> = ({ apiItem }) => {
  const hierarchyItems = apiItem
    .getHierarchy()
    .filter(item => !excludedItemKinds.includes(item.kind));

  return (
    <>
      {'\n\n'}
      {hierarchyItems.map(apiItem =>
        apiItem.kind === ApiItemKind.Package ? (
          <>
            <Link href="..">
              {PackageName.getUnscopedName(apiItem.displayName)}
            </Link>
            <LinkSeparator />
            <Link href={getApiItemFilenameLink(apiItem)}>
              {DOCUMENTATION_TITLE}
            </Link>
          </>
        ) : (
          <>
            <LinkSeparator />
            <Link href={getApiItemFilenameLink(apiItem)}>
              {apiItem.displayName}
            </Link>
          </>
        )
      )}
    </>
  );
};

interface Props {
  apiItem: ApiItem;
}
