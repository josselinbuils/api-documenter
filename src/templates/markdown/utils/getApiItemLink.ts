import { ApiItem } from '@microsoft/api-extractor-model';
import { MarkdownPage } from '../MarkdownPage';

export function getApiItemLink(apiItem: ApiItem): string {
  return `./${MarkdownPage.getFilename(apiItem)}`;
}
