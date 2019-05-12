import { ApiItem } from '@microsoft/api-extractor-model';
import * as React from 'react';
import { getPlural } from '../../../utils';
import { Title } from '../../components';
import {
  ColumnHead,
  DescriptionCell,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TitleCell,
  TypeCell
} from './table';

export const TypedMemberTable: React.FC<Props> = ({ category, items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <Title>{getPlural(category)}</Title>
      <Table>
        <TableHead>
          <ColumnHead>{category}</ColumnHead>
          <ColumnHead>Type</ColumnHead>
          <ColumnHead>Description</ColumnHead>
        </TableHead>
        <TableBody>
          {items.map((propertyItem, index) => (
            <TableRow key={index}>
              <TitleCell apiItem={propertyItem} />
              <TypeCell apiItem={propertyItem} />
              <DescriptionCell apiItem={propertyItem} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

interface Props {
  category: string;
  items: ApiItem[];
}
