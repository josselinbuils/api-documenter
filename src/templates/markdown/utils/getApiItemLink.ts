import { ApiItem } from '@microsoft/api-extractor-model';
import { getFileName } from './getFileName';

export function getApiItemLink(apiItem: ApiItem): string {
  return `./${getFileName(apiItem)}`;
}
