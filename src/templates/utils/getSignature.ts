import { ApiDeclaredItem, ApiItem } from '@microsoft/api-extractor-model';

const unwantedKeywords = ['declare', 'export'];

export function getSignature(apiItem: ApiItem): string {
  if (!(apiItem instanceof ApiDeclaredItem)) {
    return '';
  }
  return unwantedKeywords
    .reduce(
      (signature, unwantedKeyword) => signature.replace(unwantedKeyword, ''),
      apiItem.excerpt.text
    )
    .replace(/;$/, '')
    .trim();
}
