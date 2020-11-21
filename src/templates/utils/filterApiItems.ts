import { ApiItem, ApiItemKind } from '@microsoft/api-extractor-model';

export function filterApiItems(
  apiItems: readonly ApiItem[],
  apiItemKind: ApiItemKind
): ApiItem[] {
  return apiItems.filter((apiItem) => apiItem.kind === apiItemKind);
}
