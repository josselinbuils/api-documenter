import {
  ApiDocumentedItem,
  ApiItem,
  ApiReleaseTagMixin,
  ReleaseTag
} from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { Warning } from './Warning';

export const Warnings: FC<Props> = ({ apiItem }) => {
  const isBeta = (apiItem as ApiReleaseTagMixin).releaseTag === ReleaseTag.Beta;
  const { tsdocComment } = apiItem as ApiDocumentedItem;
  const isDeprecated =
    tsdocComment !== undefined && tsdocComment.deprecatedBlock !== undefined;

  return (
    <>
      {isBeta && (
        <Warning>
          This API is provided as a preview for developers and may change based
          on feedback that we receive. Do not use this API in a production
          environment.
        </Warning>
      )}
      {isDeprecated && <Warning>This API is now obsolete.</Warning>}
    </>
  );
};

interface Props {
  apiItem: ApiItem;
}
