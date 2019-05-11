// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { ApiModel, ApiItem } from '@microsoft/api-extractor-model';
import { FileSystem, NewlineKind } from '@microsoft/node-core-library';
import * as unescape from 'lodash.unescape';
import * as path from 'path';
import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Page } from './components/Page';
import { getApiItemFilename } from './utils';

/**
 * Renders API documentation in the Markdown file format.
 * For more info:  https://en.wikipedia.org/wiki/Markdown
 */
export class MarkdownDocumenter {
  private outputFolder: string;

  constructor(private readonly apiModel: ApiModel) {}

  generateFiles(outputFolder: string): void {
    const firstPackage = this.apiModel.packages[0];

    this.outputFolder = outputFolder;

    console.log();
    console.log(`Deleting old output from ${outputFolder}`);
    FileSystem.ensureEmptyFolder(outputFolder);

    [firstPackage, ...firstPackage.members[0].members].forEach(
      this.writeApiItemPage
    );
  }

  private writeApiItemPage = (apiItem: ApiItem): void => {
    const filename = path.join(this.outputFolder, getApiItemFilename(apiItem));
    const rendered = unescape(renderToStaticMarkup(<Page apiItem={apiItem} />));

    FileSystem.writeFile(filename, rendered, {
      convertLineEndings: NewlineKind.Lf
    });
  };
}
