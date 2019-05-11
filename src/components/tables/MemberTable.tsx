import { ApiItem } from '@microsoft/api-extractor-model';
import * as React from 'react';
import { getPlural } from '../../utils';
import { Title } from '../Title';
import {
  ColumnHead,
  DescriptionCell,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TitleCell
} from './table';

export const MemberTable: React.FC<Props> = ({ memberItems, memberType }) => {
  if (memberItems.length === 0) {
    return null;
  }

  return (
    <>
      <Title>{getPlural(memberType)}</Title>
      <Table>
        <TableHead>
          <ColumnHead>{memberType}</ColumnHead>
          <ColumnHead>Description</ColumnHead>
        </TableHead>
        <TableBody>
          {memberItems.map(memberItem => (
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
  memberType: string;
  memberItems: ApiItem[];
}
