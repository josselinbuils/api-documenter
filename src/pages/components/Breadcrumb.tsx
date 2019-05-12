import { ApiItem, ApiItemKind } from '@microsoft/api-extractor-model';
import { DOCUMENTATION_TITLE } from '../../constants';
import { getApiItemFilenameLink, getUnscopedName } from '../../utils';
import React, { FC, Fragment } from 'react';
import { Link } from './Link';

const excludedItemKinds = [ApiItemKind.Model, ApiItemKind.EntryPoint];

const LinkSeparator = () => <> > </>;

export const Breadcrumb: FC<Props> = ({ apiItem }) => {
  const hierarchyItems = apiItem
    .getHierarchy()
    .filter(item => !excludedItemKinds.includes(item.kind));

  const packageItem = hierarchyItems.shift() as ApiItem;

  return (
    <>
      {'\n\n'}
      <Link href="..">{getUnscopedName(packageItem.displayName)}</Link>
      <LinkSeparator />
      <Link href={getApiItemFilenameLink(packageItem)}>
        {DOCUMENTATION_TITLE}
      </Link>
      {hierarchyItems.map((apiItem, index) => (
        <Fragment key={index}>
          <LinkSeparator />
          <Link href={getApiItemFilenameLink(apiItem)}>
            {apiItem.displayName}
          </Link>
        </Fragment>
      ))}
    </>
  );
};

interface Props {
  apiItem: ApiItem;
}
