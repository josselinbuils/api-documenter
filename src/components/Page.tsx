import {
  ApiDeclaredItem,
  ApiDocumentedItem,
  ApiItem,
  ApiItemKind,
  ApiReleaseTagMixin,
  ReleaseTag
} from '@microsoft/api-extractor-model';
import { PackageName } from '@microsoft/node-core-library';
import * as React from 'react';
import { BetaWarning } from './BetaWarning';
import { Breadcrumb } from './Breadcrumb';
import { Description } from './Description';
import { PageHeader } from './PageHeader';
import { Signature } from './Signature';
import { Tables } from './Tables';
import { Title } from './Title';
import { Warning } from './Warning';

export const Page: React.FC<Props> = ({ apiItem }) => {
  const hasSignature =
    apiItem instanceof ApiDeclaredItem && apiItem.excerpt.text.length > 0;

  const isBeta =
    ApiReleaseTagMixin.isBaseClassOf(apiItem) &&
    apiItem.releaseTag === ReleaseTag.Beta;

  const title =
    apiItem.kind === ApiItemKind.Package
      ? PackageName.getUnscopedName(apiItem.displayName)
      : `${apiItem.getScopedNameWithinPackage()} ${apiItem.kind.toLowerCase()}`;

  const tsdocComment =
    apiItem instanceof ApiDocumentedItem && apiItem.tsdocComment;

  return (
    <>
      <PageHeader />
      <Breadcrumb apiItem={apiItem} />
      <Title>{title}</Title>
      {isBeta && <BetaWarning />}
      {tsdocComment && (
        <>
          {tsdocComment.deprecatedBlock && (
            <Warning>This API is now obsolete.</Warning>
          )}
          <Description comment={tsdocComment} />
        </>
      )}
      {hasSignature && (
        <Signature>{apiItem.getExcerptWithModifiers()}</Signature>
      )}
      <Tables apiItem={apiItem} />
      {'\n'}
    </>
  );
};

interface Props {
  apiItem: ApiItem;
}
