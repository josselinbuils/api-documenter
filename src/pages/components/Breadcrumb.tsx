import { ApiItem, ApiItemKind } from '@microsoft/api-extractor-model';
import { PackageName } from '@microsoft/node-core-library';
import { DOCUMENTATION_TITLE } from '../../constants';
import { getApiItemFilenameLink } from '../../utils';
import * as React from 'react';
import { Link } from './Link';

const excludedItemKinds = [ApiItemKind.Model, ApiItemKind.EntryPoint];

const LinkSeparator = () => ' > ';

export const Breadcrumb: React.FC<Props> = ({ apiItem }) => {
  const hierarchyItems = apiItem
    .getHierarchy()
    .filter(item => !excludedItemKinds.includes(item.kind));

  const packageItem = hierarchyItems.shift();

  return (
    <>
      {'\n\n'}
      <Link href="..">
        {PackageName.getUnscopedName(packageItem.displayName)}
      </Link>
      <LinkSeparator />
      <Link href={getApiItemFilenameLink(packageItem)}>
        {DOCUMENTATION_TITLE}
      </Link>
      {hierarchyItems.map((apiItem, index) => (
        <React.Fragment key={index}>
          <LinkSeparator />
          <Link href={getApiItemFilenameLink(apiItem)}>
            {apiItem.displayName}
          </Link>
        </React.Fragment>
      ))}
    </>
  );
};

interface Props {
  apiItem: ApiItem;
}
