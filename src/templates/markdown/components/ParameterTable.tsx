import { ApiParameterListMixin } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { CommentContent } from './CommentContent';
import { ColumnHead } from './Table/ColumnHead';
import { Table } from './Table/Table';
import { TableBody } from './Table/TableBody';
import { TableCell } from './Table/TableCell';
import { TableHead } from './Table/TableHead';
import { TableRow } from './Table/TableRow';
import { TypeCell } from './Table/TypeCell';
import { Title } from './Title';

export const ParameterTable: FC<Props> = ({
  apiParameterListMixin,
  noTitle = false,
}) => {
  if (apiParameterListMixin.parameters.length === 0) {
    return null;
  }

  return (
    <>
      {!noTitle && <Title level={2}>Parameters</Title>}
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
              <TableCell>
                {apiParameter.tsdocParamBlock && (
                  <CommentContent
                    docSection={apiParameter.tsdocParamBlock.content}
                    inArray
                  />
                )}
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
  noTitle?: boolean;
}
