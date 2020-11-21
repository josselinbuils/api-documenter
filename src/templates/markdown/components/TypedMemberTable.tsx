import { ApiItem } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { getPlural } from '../../utils/getPlural';
import { ColumnHead } from './Table/ColumnHead';
import { DescriptionCell } from './Table/DescriptionCell';
import { Table } from './Table/Table';
import { TableBody } from './Table/TableBody';
import { TableHead } from './Table/TableHead';
import { TableRow } from './Table/TableRow';
import { TitleCell } from './Table/TitleCell';
import { TypeCell } from './Table/TypeCell';
import { Title } from './Title';

export const TypedMemberTable: FC<Props> = ({ category, items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <Title level={2}>{getPlural(category)}</Title>
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
              <TypeCell input={propertyItem} />
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
