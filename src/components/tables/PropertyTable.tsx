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
  TitleCell,
  TypeCell
} from './table';

export const PropertyTable: React.FC<Props> = ({
  propertyItems,
  propertyType
}) => {
  if (propertyItems.length === 0) {
    return null;
  }

  return (
    <>
      <Title>{getPlural(propertyType)}</Title>
      <Table>
        <TableHead>
          <ColumnHead>{propertyType}</ColumnHead>
          <ColumnHead>Type</ColumnHead>
          <ColumnHead>Description</ColumnHead>
        </TableHead>
        <TableBody>
          {propertyItems.map(propertyItem => (
            <TableRow>
              <TitleCell apiItem={propertyItem} />
              <TypeCell apiItem={propertyItem} />
              <DescriptionCell apiItem={propertyItem} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

interface Props {
  propertyType: string;
  propertyItems: ApiItem[];
}
