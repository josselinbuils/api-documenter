import { Parameter } from '@microsoft/api-extractor-model';
import { getCommentText } from '../../utils';

export function getParameterDescription(parameter: Parameter): string {
  return parameter.tsdocParamBlock !== undefined
    ? getCommentText(parameter.tsdocParamBlock.content, true)
    : '';
}
