import { ApiDocumentedItem, ApiItem } from '@microsoft/api-extractor-model';
import * as React from 'react';
import { TableCell } from './TableCell';
import { nodesToString } from '../../../utils';

export const DescriptionCell: React.FC<Props> = ({ apiItem }) => (
  <TableCell>
    {apiItem instanceof ApiDocumentedItem &&
      apiItem.tsdocComment !== undefined &&
      // TODO use a helper to factorize
      nodesToString(
        apiItem.tsdocComment.summarySection.nodes[0].getChildNodes(),
        true
      )}
  </TableCell>
);

interface Props {
  apiItem: ApiItem;
}
