import {
  ApiDocumentedItem,
  ApiItem,
  ApiItemKind,
  ApiReleaseTagMixin,
  ReleaseTag
} from '@microsoft/api-extractor-model';
import * as React from 'react';
import { DOCUMENTATION_TITLE } from '../constants';
import { BetaWarning } from './BetaWarning';
import { Breadcrumb } from './Breadcrumb';
import { Description } from './Description';
import { PageHeader } from './PageHeader';
import { Signature } from './Signature';
import { Tables } from './Tables';
import { Title } from './Title';
import { Warning } from './Warning';

export const Page: React.FC<Props> = ({ apiItem }) => {
  const isBeta =
    ApiReleaseTagMixin.isBaseClassOf(apiItem) &&
    apiItem.releaseTag === ReleaseTag.Beta;

  const isPackagePage = apiItem.kind === ApiItemKind.Package;

  const title = isPackagePage
    ? DOCUMENTATION_TITLE
    : `${apiItem.getScopedNameWithinPackage()} ${apiItem.kind.toLowerCase()}`;

  const tsdocComment =
    apiItem instanceof ApiDocumentedItem && apiItem.tsdocComment;

  return (
    <>
      <PageHeader />
      <Breadcrumb apiItem={apiItem} />
      <Title>{title}</Title>
      {isBeta && <BetaWarning />}
      {!isPackagePage && tsdocComment && (
        <>
          {tsdocComment.deprecatedBlock && (
            <Warning>This API is now obsolete.</Warning>
          )}
          <Description comment={tsdocComment} />
        </>
      )}
      <Signature apiItem={apiItem} />
      <Tables apiItem={apiItem} />
      {'\n'}
    </>
  );
};

interface Props {
  apiItem: ApiItem;
}
