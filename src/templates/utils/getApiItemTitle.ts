import { ApiItem, ApiItemKind } from '@microsoft/api-extractor-model';
import { DOCUMENTATION_TITLE } from '../../constants';

export function getApiItemTitle(apiItem: ApiItem): string {
  return apiItem.kind === ApiItemKind.Package
    ? DOCUMENTATION_TITLE
    : apiItem.displayName;
}
