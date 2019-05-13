import { ApiParameterListMixin } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { CommentContent } from './CommentContent';
import {
  ColumnHead,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TypeCell
} from './Table';
import { Title } from './Title';

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
              <TableCell>
                {apiParameter.tsdocParamBlock && (
                  <CommentContent
                    docSection={apiParameter.tsdocParamBlock.content}
                    inArray={true}
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
}
