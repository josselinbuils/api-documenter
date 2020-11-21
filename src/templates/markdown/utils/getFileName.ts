import { ApiItem, ApiItemKind } from '@microsoft/api-extractor-model';
import { getApiItemFilename } from '../../utils/getApiItemFilename';

export function getFileName(apiItem: ApiItem): string {
  return apiItem.kind === ApiItemKind.Package
    ? 'README.md'
    : `${getApiItemFilename(apiItem)}.md`;
}
