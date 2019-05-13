import { ApiItem } from '@microsoft/api-extractor-model';
import { FC } from 'react';

export interface Template<T> extends FC<T> {
  getFilename(apiItem: ApiItem): string;
}
