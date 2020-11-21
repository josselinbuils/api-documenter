import {
  ApiItem,
  ApiItemKind,
  ApiPropertyItem,
} from '@microsoft/api-extractor-model';
import { filterApiItems } from './filterApiItems';

export function getPropertyItems(apiItem: ApiItem): ApiItem[] {
  return filterApiItems(apiItem.members, ApiItemKind.Property).filter(
    (apiMemberItem) => !(apiMemberItem as ApiPropertyItem).isEventProperty
  );
}
