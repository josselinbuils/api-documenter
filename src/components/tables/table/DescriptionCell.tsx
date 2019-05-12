import { ApiItem } from '@microsoft/api-extractor-model';
import * as React from 'react';
import { getCommentText } from '../../../utils';
import { TableCell } from './TableCell';

export const DescriptionCell: React.FC<Props> = ({ apiItem }) => (
  <TableCell>{getCommentText(apiItem.tsdocComment, true)}</TableCell>
);

interface Props {
  apiItem: ApiItem;
}
