// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { DocNode, DocSection } from '@microsoft/tsdoc';
import { CustomDocNodeKind, CustomDocNodes } from './CustomDocNodeKind';

/**
 * Represents table cell, similar to an HTML `<td>` element.
 */
export class DocTableCell extends DocNode {
  readonly content: DocSection;

  constructor(sectionChildNodes?: ReadonlyArray<DocNode>) {
    super({ configuration: CustomDocNodes.configuration });

    this.content = new DocSection(
      { configuration: this.configuration },
      sectionChildNodes
    );
  }

  // noinspection JSMethodCanBeStatic
  /** @override */
  get kind(): string {
    return CustomDocNodeKind.TableCell;
  }
}
