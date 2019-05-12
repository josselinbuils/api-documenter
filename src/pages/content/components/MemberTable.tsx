import { ApiItem } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { getPlural } from '../../../utils';
import { Title } from '../../components';
import {
  ColumnHead,
  DescriptionCell,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TitleCell
} from './table';

export const MemberTable: FC<Props> = ({ category, items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <Title>{getPlural(category)}</Title>
      <Table>
        <TableHead>
          <ColumnHead>{category}</ColumnHead>
          <ColumnHead>Description</ColumnHead>
        </TableHead>
        <TableBody>
          {items.map((memberItem, index) => (
            <TableRow key={index}>
              <TitleCell apiItem={memberItem} />
              <DescriptionCell apiItem={memberItem} />
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
