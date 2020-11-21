import { ApiEnum } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { ColumnHead } from './Table/ColumnHead';
import { DescriptionCell } from './Table/DescriptionCell';
import { Table } from './Table/Table';
import { TableBody } from './Table/TableBody';
import { TableCell } from './Table/TableCell';
import { TableHead } from './Table/TableHead';
import { TableRow } from './Table/TableRow';
import { TypeCell } from './Table/TypeCell';
import { Title } from './Title';

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
