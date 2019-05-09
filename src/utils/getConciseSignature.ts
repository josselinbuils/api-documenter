import { ApiItem, ApiParameterListMixin } from '@microsoft/api-extractor-model';

/**
 * Generates a concise signature for a function.  Example: "getArea(width, height)"
 */
export function getConciseSignature(apiItem: ApiItem): string {
  if (ApiParameterListMixin.isBaseClassOf(apiItem)) {
    const parameterNames = apiItem.parameters.map(x => x.name);
    return `${apiItem.displayName}(${parameterNames.join(', ')})`;
  }
  return apiItem.displayName;
}
