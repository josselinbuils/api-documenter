import { ApiItem, ApiModel } from '@microsoft/api-extractor-model';
import fs from 'fs-extra';
import unescape from 'lodash.unescape';
import path from 'path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PAGE_ITEM_KINDS } from './constants';
import { Page } from './pages';
import { getApiItemFilename } from './utils';

export class MarkdownDocumenter {
  private outputFolder?: string;

  constructor(private readonly apiModel: ApiModel) {}

  generateFiles(outputFolder: string): void {
    this.outputFolder = outputFolder;

    console.log();
    console.log(`Deleting old output from ${outputFolder}`);
    fs.emptyDirSync(outputFolder);

    this.writeApiItemPage(this.apiModel.packages[0]);
  }

  private writeApiItemPage = (apiItem: ApiItem): void => {
    if (PAGE_ITEM_KINDS.includes(apiItem.kind)) {
      const filename = path.join(
        this.outputFolder as string,
        getApiItemFilename(apiItem)
      );

      const rendered = unescape(
        renderToStaticMarkup(<Page apiItem={apiItem} />)
      ).replace(/ +$/gm, '');

      fs.writeFileSync(filename, rendered);
    }

    if (apiItem.members !== undefined) {
      apiItem.members.forEach(this.writeApiItemPage);
    }
  };
}
