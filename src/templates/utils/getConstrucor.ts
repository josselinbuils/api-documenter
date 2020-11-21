import {
  ApiClass,
  ApiConstructor,
  ApiItemKind,
} from '@microsoft/api-extractor-model';
import { filterApiItems } from './filterApiItems';

export function getConstructor(apiClass: ApiClass): ApiConstructor | undefined {
  return filterApiItems(apiClass.members, ApiItemKind.Constructor)[0] as
    | ApiConstructor
    | undefined;
}
