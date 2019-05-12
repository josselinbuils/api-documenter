import {
  ApiEnumMember,
  ApiPropertyItem,
  ApiReturnTypeMixin,
  ApiVariable,
  Parameter
} from '@microsoft/api-extractor-model';

export function getType(input: any): string {
  const excerpt =
    (input as ApiEnumMember).initializerExcerpt ||
    (input as ApiPropertyItem).propertyTypeExcerpt ||
    (input as ApiReturnTypeMixin).returnTypeExcerpt ||
    (input as ApiVariable).variableTypeExcerpt ||
    (input as Parameter).parameterTypeExcerpt;

  return excerpt !== undefined ? excerpt.text : '';
}
