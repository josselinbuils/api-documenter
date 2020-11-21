import { ApiItem, ApiPropertyItem } from '@microsoft/api-extractor-model';

export function getEventItems(apiItem: ApiItem): ApiItem[] {
  return apiItem.members.filter(
    (apiMemberItem) => (apiMemberItem as ApiPropertyItem).isEventProperty
  );
}
