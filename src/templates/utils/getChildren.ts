import { ApiItem, ApiItemKind } from '@microsoft/api-extractor-model';

export function getChildren(apiItem: ApiItem): readonly ApiItem[] {
  if (
    apiItem.members !== undefined &&
    apiItem.members[0].kind === ApiItemKind.EntryPoint
  ) {
    return apiItem.members[0].members;
  }
  return apiItem.members;
}
