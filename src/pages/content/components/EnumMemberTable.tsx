import { ApiEnum } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { Title } from '../../components';
import {
  ColumnHead,
  DescriptionCell,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TypeCell
} from './table';

export const EnumMemberTable: FC<Props> = ({ apiEnum }) => (
  <>
    <Title level={2}>Enumeration Members</Title>
    <Table>
      <TableHead>
        <ColumnHead>Member</ColumnHead>
        <ColumnHead>Value</ColumnHead>
        <ColumnHead>Description</ColumnHead>
      </TableHead>
      <TableBody>
        {apiEnum.members.map((enumMemberItem, index) => (
          <TableRow key={index}>
            <TableCell>{enumMemberItem.displayName}</TableCell>
            <TypeCell input={enumMemberItem} />
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
