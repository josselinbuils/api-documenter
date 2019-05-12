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
  TitleCell
} from './table';

export const MemberTable: React.FC<Props> = ({ category, items }) => {
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
          {items.map(memberItem => (
            <TableRow>
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
