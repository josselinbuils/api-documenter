import { ApiEnum } from '@microsoft/api-extractor-model';
import * as React from 'react';
import { Title } from '../../components';
import {
  ColumnHead,
  DescriptionCell,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from './table';

export const EnumMemberTable: React.FC<Props> = ({ apiEnum }) => (
  <>
    <Title>Enumeration Members</Title>
    <Table>
      <TableHead>
        <ColumnHead>Member</ColumnHead>
        <ColumnHead>Value</ColumnHead>
        <ColumnHead>Description</ColumnHead>
      </TableHead>
      <TableBody>
        {apiEnum.members.map(enumMemberItem => (
          <TableRow>
            <TableCell>{enumMemberItem.displayName}</TableCell>
            <TableCell>{enumMemberItem.initializerExcerpt.text}</TableCell>
            <DescriptionCell apiItem={enumMemberItem} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
);

interface Props {
  apiEnum: ApiEnum;
}
