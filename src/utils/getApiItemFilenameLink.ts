import { ApiItem } from '@microsoft/api-extractor-model';
import { getApiItemFilename } from './getApiItemFilename';

export function getApiItemFilenameLink(apiItem: ApiItem): string {
  return `./${getApiItemFilename(apiItem)}`;
}
