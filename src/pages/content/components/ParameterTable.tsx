import { ApiParameterListMixin } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { getParameterDescription } from '../../../utils';
import { Title } from '../../components';
import {
  ColumnHead,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TypeCell
} from './table';

export const ParameterTable: FC<Props> = ({ apiParameterListMixin }) => {
  if (apiParameterListMixin.parameters.length === 0) {
    return null;
  }

  return (
    <>
      <Title level={2}>Parameters</Title>
      <Table>
        <TableHead>
          <ColumnHead>Parameter</ColumnHead>
          <ColumnHead>Type</ColumnHead>
          <ColumnHead>Description</ColumnHead>
        </TableHead>
        <TableBody>
          {apiParameterListMixin.parameters.map((apiParameter, index) => (
            <TableRow key={index}>
              <TableCell>{apiParameter.name}</TableCell>
              <TypeCell input={apiParameter} />
              <TableCell>{getParameterDescription(apiParameter)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

interface Props {
  apiParameterListMixin: ApiParameterListMixin;
}
