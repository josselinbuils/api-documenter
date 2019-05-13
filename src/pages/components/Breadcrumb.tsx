import { ApiItem, ApiItemKind } from '@microsoft/api-extractor-model';
import React, { FC, Fragment } from 'react';
import { DOCUMENTATION_TITLE } from '../../constants';
import { getApiItemFilenameLink, getUnscopedName } from '../../utils';
import { Link } from './Link';

const excludedItemKinds = [ApiItemKind.Model, ApiItemKind.EntryPoint];

const LinkSeparator = () => <> > </>;

export const Breadcrumb: FC<Props> = ({ apiItem }) => {
  const hierarchyItems = apiItem
    .getHierarchy()
    .filter(item => !excludedItemKinds.includes(item.kind));

  const packageItem = hierarchyItems.shift() as ApiItem;

  // noinspection HtmlUnknownTarget
  return (
    <>
      {'\n\n'}
      <Link href="../README.md">
        {getUnscopedName(packageItem.displayName)}
      </Link>
      <LinkSeparator />
      <Link href={getApiItemFilenameLink(packageItem)}>
        {DOCUMENTATION_TITLE}
      </Link>
      {hierarchyItems.map((hierarchyItem, index) => (
        <Fragment key={index}>
          <LinkSeparator />
          <Link href={getApiItemFilenameLink(hierarchyItem)}>
            {hierarchyItem.displayName}
          </Link>
        </Fragment>
      ))}
    </>
  );
};

interface Props {
  apiItem: ApiItem;
}
