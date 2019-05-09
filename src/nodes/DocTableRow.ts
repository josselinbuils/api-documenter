// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { DocNode, DocPlainText } from '@microsoft/tsdoc';
import { CustomDocNodeKind, CustomDocNodes } from './CustomDocNodeKind';
import { DocTableCell } from './DocTableCell';

/**
 * Represents table row, similar to an HTML `<tr>` element.
 */
export class DocTableRow extends DocNode {
  private readonly _cells: DocTableCell[];

  constructor(cells?: ReadonlyArray<DocTableCell>) {
    super({ configuration: CustomDocNodes.configuration });

    this._cells = [];
    if (cells) {
      for (const cell of cells) {
        this.addCell(cell);
      }
    }
  }

  // noinspection JSMethodCanBeStatic
  /** @override */
  get kind(): string {
    return CustomDocNodeKind.TableRow;
  }

  get cells(): ReadonlyArray<DocTableCell> {
    return this._cells;
  }

  addCell(cell: DocTableCell): void {
    this._cells.push(cell);
  }

  createAndAddCell(): DocTableCell {
    const newCell = new DocTableCell();
    this.addCell(newCell);
    return newCell;
  }

  addPlainTextCell(cellContent: string): DocTableCell {
    const cell = this.createAndAddCell();
    cell.content.appendNodeInParagraph(
      new DocPlainText({
        configuration: this.configuration,
        text: cellContent
      })
    );
    return cell;
  }

  /** @override */
  protected onGetChildNodes(): ReadonlyArray<DocNode | undefined> {
    return this._cells;
  }
}
