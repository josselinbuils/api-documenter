import { ApiItem } from '@microsoft/api-extractor-model';
import fs from 'fs-extra';
import { decode } from 'he';
import path from 'path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { PAGE_ITEM_KINDS } from '../constants';
import { Page } from '../pages';
import { getApiItemFilename } from './getApiItemFilename';

export function writeApiItemPage(outputPath: string, apiItem: ApiItem): void {
  if (PAGE_ITEM_KINDS.includes(apiItem.kind)) {
    const filename = path.join(outputPath, getApiItemFilename(apiItem));

    console.log('\n\n\n\n', renderToStaticMarkup(<Page apiItem={apiItem} />));

    const rendered = decode(
      renderToStaticMarkup(<Page apiItem={apiItem} />)
    ).replace(/ +$/gm, '');

    fs.writeFileSync(filename, rendered);
  }

  if (apiItem.members !== undefined) {
    apiItem.members.forEach(writeApiItemPage.bind(null, outputPath));
  }
}
