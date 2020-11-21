import { decode } from 'he';
import React, { FC } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export const Table: FC = ({ children }) => {
  const renderedTable = decode(renderToStaticMarkup(<>{children}</>));
  return (
    <>
      {'\n'}
      {makeTablePrettier(renderedTable)}
      {'\n'}
    </>
  );
};

/**
 * Ensures that all rows have columns of equal size.
 */
function makeTablePrettier(renderedTable: string): string {
  const columnLengths = getColumnLengths(renderedTable);

  return renderedTable
    .split('\n')
    .map((line) =>
      line
        .split('|')
        .map((column, index) => {
          if (column.length === 0) {
            return '';
          }
          const lengthDiff = columnLengths[index - 1] - column.length;
          const paddingChar = / -+ /.test(column) ? '-' : ' ';
          return `${column.slice(0, -1)}${new Array(lengthDiff + 1).join(
            paddingChar
          )} `;
        })
        .join('|')
    )
    .join('\n');
}

function getColumnLengths(renderedTable: string): number[] {
  const columnLengths: number[] = [];

  renderedTable.split('\n').forEach((line) =>
    line
      .split('|')
      .slice(1, -1)
      .forEach((column, index) => {
        columnLengths[index] = Math.max(
          column.length,
          columnLengths[index] || 0
        );
      })
  );

  return columnLengths;
}
