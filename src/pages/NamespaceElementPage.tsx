import {
  ApiClass,
  ApiDocumentedItem,
  ApiEnum,
  ApiFunction,
  ApiInterface,
  ApiItem,
  ApiItemKind,
  ApiReleaseTagMixin,
  ReleaseTag
} from '@microsoft/api-extractor-model';
import React, { FC, ReactNode } from 'react';
import {
  BetaWarning,
  Description,
  ObsolescenceWarning,
  Signature,
  Title
} from './components';
import {
  ClassContent,
  EnumContent,
  FunctionContent,
  InterfaceContent
} from './content';

export const NamespaceElementPage: FC<Props> = ({ apiItem }) => {
  const isBeta = (apiItem as ApiReleaseTagMixin).releaseTag === ReleaseTag.Beta;

  const tsdocComment =
    apiItem instanceof ApiDocumentedItem ? apiItem.tsdocComment : undefined;

  const isDeprecated =
    tsdocComment !== undefined && tsdocComment.deprecatedBlock !== undefined;

  const content = getContent(apiItem);

  return (
    <>
      <Title>{apiItem.getScopedNameWithinPackage()}</Title>
      {isBeta && <BetaWarning />}
      {isDeprecated && <ObsolescenceWarning />}
      <Description comment={tsdocComment} />
      <Signature apiItem={apiItem} />
      {content}
    </>
  );
};

interface Props {
  apiItem: ApiItem;
}

function getContent(apiItem: ApiItem): ReactNode {
  switch (apiItem.kind) {
    case ApiItemKind.Class:
      return <ClassContent apiClass={apiItem as ApiClass} />;

    case ApiItemKind.Enum:
      return <EnumContent apiEnum={apiItem as ApiEnum} />;

    case ApiItemKind.Function:
    case ApiItemKind.Method:
    case ApiItemKind.MethodSignature:
      return <FunctionContent apiFunction={apiItem as ApiFunction} />;

    case ApiItemKind.Interface:
      return <InterfaceContent apiInterface={apiItem as ApiInterface} />;

    case ApiItemKind.TypeAlias:
      return '';

    default:
      throw new Error(`Invalid content kind: ${apiItem.kind}`);
  }
}
