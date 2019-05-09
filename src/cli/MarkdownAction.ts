// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { BaseAction } from './BaseAction';
import { MarkdownDocumenter } from '../MarkdownDocumenter';
import { ApiModel } from '@microsoft/api-extractor-model';

export class MarkdownAction extends BaseAction {
  constructor() {
    super({
      actionName: 'markdown',
      summary: 'Generate documentation as Markdown files (*.md)',
      documentation:
        'Generates API documentation as a collection of files in' +
        ' Markdown format, suitable for example for publishing on a GitHub site.'
    });
  }

  protected onExecute(): Promise<void> {
    // override
    const apiModel: ApiModel = this.buildApiModel();
    const markdownDocumenter: MarkdownDocumenter = new MarkdownDocumenter(
      apiModel
    );
    markdownDocumenter.generateFiles(this.outputFolder);
    return Promise.resolve();
  }
}
