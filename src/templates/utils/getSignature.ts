import { ApiDeclaredItem, ApiItem } from '@microsoft/api-extractor-model';

const unwantedKeywords = ['declare', 'export'];

export function getSignature(apiItem: ApiItem): string | undefined {
  if (!(apiItem instanceof ApiDeclaredItem)) {
    return undefined;
  }
  return unwantedKeywords
    .reduce(
      (signature, unwantedKeyword) => signature.replace(unwantedKeyword, ''),
      apiItem.excerpt.text
    )
    .replace(/;$/, '')
    .trim();
}
