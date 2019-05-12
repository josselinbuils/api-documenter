import { ApiItem } from '@microsoft/api-extractor-model';
import fs from 'fs-extra';
import unescape from 'lodash.unescape';
import path from 'path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PAGE_ITEM_KINDS } from '../constants';
import { Page } from '../pages';
import { getApiItemFilename } from './getApiItemFilename';

export function writeApiItemPage(outputPath: string, apiItem: ApiItem): void {
  if (PAGE_ITEM_KINDS.includes(apiItem.kind)) {
    const filename = path.join(outputPath, getApiItemFilename(apiItem));

    const rendered = unescape(
      renderToStaticMarkup(<Page apiItem={apiItem} />)
    ).replace(/ +$/gm, '');

    fs.writeFileSync(filename, rendered);
  }

  if (apiItem.members !== undefined) {
    apiItem.members.forEach(writeApiItemPage.bind(null, outputPath));
  }
}
