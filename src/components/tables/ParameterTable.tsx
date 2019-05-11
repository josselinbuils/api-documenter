import { ApiParameterListMixin } from '@microsoft/api-extractor-model';
import * as React from 'react';
import { Title } from '../Title';
import {
  ColumnHead,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from './table';

export const ParameterTable: React.FC<Props> = ({ apiParameterListMixin }) => {
  if (apiParameterListMixin.parameters.length === 0) {
    return null;
  }

  return (
    <>
      <Title>Parameters</Title>
      <Table>
        <TableHead>
          <ColumnHead>Parameter</ColumnHead>
          <ColumnHead>Type</ColumnHead>
          <ColumnHead>Description</ColumnHead>
        </TableHead>
        <TableBody>
          {apiParameterListMixin.parameters.map(apiParameter => (
            <TableRow>
              <TableCell>{apiParameter.name}</TableCell>
              <TableCell>{apiParameter.parameterTypeExcerpt.text}</TableCell>
              <TableCell>
                test
                {/*{apiParameter.tsdocParamBlock &&*/}
                {/*  apiParameter.tsdocParamBlock.content}*/}
              </TableCell>
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
