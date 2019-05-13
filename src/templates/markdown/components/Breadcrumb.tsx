import { ApiItem, ApiItemKind } from '@microsoft/api-extractor-model';
import React, { FC, Fragment } from 'react';
import { getApiItemTitle, getUnscopedName } from '../../utils';
import { getApiItemLink } from '../utils';
import { Link } from './Link';

const excludedItemKinds = [ApiItemKind.Model, ApiItemKind.EntryPoint];

export const Breadcrumb: FC<Props> = ({ apiItem }) => {
  const hierarchyItems = apiItem
    .getHierarchy()
    .filter(item => !excludedItemKinds.includes(item.kind));

  // noinspection HtmlUnknownTarget
  return (
    <>
      {'\n'}
      <Link href="../README.md">
        {getUnscopedName(hierarchyItems[0].displayName)}
      </Link>
      {hierarchyItems.map((hierarchyItem, index) => (
        <Fragment key={index}>
          {' > '}
          <Link href={getApiItemLink(hierarchyItem)}>
            {getApiItemTitle(hierarchyItem)}
          </Link>
        </Fragment>
      ))}
      {'\n'}
    </>
  );
};

interface Props {
  apiItem: ApiItem;
}
