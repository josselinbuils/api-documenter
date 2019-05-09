// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { CommandLineParser } from '@microsoft/ts-command-line';
import { MarkdownAction } from './MarkdownAction';

export class ApiDocumenterCommandLine extends CommandLineParser {
  constructor() {
    super({
      toolFilename: 'api-documenter',
      toolDescription:
        'Reads *.api.json files produced by api-extractor, ' +
        ' and generates API documentation in various output formats.'
    });
    this.addAction(new MarkdownAction());
  }

  protected onDefineParameters(): void {
    // override
    // No parameters
  }
}
