import {
  ApiClass,
  ApiEnum,
  ApiFunction,
  ApiInterface,
  ApiItem,
  ApiItemKind
} from '@microsoft/api-extractor-model';
import React from 'react';
import { Template } from '../../cli/Template';
import { ClassPage } from './ClassPage';
import { EnumPage } from './EnumPage';
import { FunctionPage } from './FunctionPage';
import { InterfacePage } from './InterfacePage';
import { PackageOrNamespacePage } from './PackageOrNamespacePage';
import { getFileName } from './utils/getFileName';

export const MarkdownPage: Template<Props> = ({ apiItem }) => {
  switch (apiItem.kind) {
    case ApiItemKind.Class:
      return <ClassPage apiClass={apiItem as ApiClass} />;

    case ApiItemKind.Enum:
      return <EnumPage apiEnum={apiItem as ApiEnum} />;

    case ApiItemKind.Function:
    case ApiItemKind.Method:
    case ApiItemKind.MethodSignature:
      return <FunctionPage apiFunction={apiItem as ApiFunction} />;

    case ApiItemKind.Interface:
      return <InterfacePage apiInterface={apiItem as ApiInterface} />;

    case ApiItemKind.Namespace:
    case ApiItemKind.Package:
      return <PackageOrNamespacePage apiItem={apiItem} />;

    default:
      throw new Error(`Invalid page kind: ${apiItem.kind}`);
  }
};

MarkdownPage.getFilename = getFileName;

interface Props {
  apiItem: ApiItem;
}
