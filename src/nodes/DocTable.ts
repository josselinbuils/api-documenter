// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { DocNode } from '@microsoft/tsdoc';
import { CustomDocNodeKind, CustomDocNodes } from './CustomDocNodeKind';
import { DocTableRow } from './DocTableRow';
import { DocTableCell } from './DocTableCell';

/**
 * Constructor parameters for {@link DocTable}.
 */
export interface IDocTableParameters {
  headerCells?: ReadonlyArray<DocTableCell>;
  headerTitles?: string[];
}

/**
 * Represents table, similar to an HTML `<table>` element.
 */
export class DocTable extends DocNode {
  readonly header: DocTableRow;

  private readonly _rows: DocTableRow[];

  constructor(
    parameters: IDocTableParameters,
    rows?: ReadonlyArray<DocTableRow>
  ) {
    super({ configuration: CustomDocNodes.configuration, ...parameters });

    this.header = new DocTableRow();
    this._rows = [];

    if (parameters) {
      if (parameters.headerTitles) {
        if (parameters.headerCells) {
          throw new Error(
            'IDocTableParameters.headerCells and IDocTableParameters.headerTitles' +
              ' cannot both be specified'
          );
        }
        for (const cellText of parameters.headerTitles) {
          this.header.addPlainTextCell(cellText);
        }
      } else if (parameters.headerCells) {
        for (const cell of parameters.headerCells) {
          this.header.addCell(cell);
        }
      }
    }

    if (rows) {
      for (const row of rows) {
        this.addRow(row);
      }
    }
  }

  // noinspection JSMethodCanBeStatic
  /** @override */
  get kind(): string {
    return CustomDocNodeKind.Table;
  }

  get rows(): ReadonlyArray<DocTableRow> {
    return this._rows;
  }

  addRow(row: DocTableRow): void {
    this._rows.push(row);
  }

  createAndAddRow(): DocTableRow {
    const row = new DocTableRow();
    this.addRow(row);
    return row;
  }

  /** @override */
  protected onGetChildNodes(): ReadonlyArray<DocNode | undefined> {
    return [this.header, ...this._rows];
  }
}
