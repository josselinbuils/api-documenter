import { ApiItem } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { getSignature } from '../../utils';

export const Signature: FC<Props> = ({ apiItem }) => {
  const signature = getSignature(apiItem);

  if (signature === undefined) {
    return null;
  }

  return <>{`\n\`\`\`typescript\n${signature}\n\`\`\`\n`}</>;
};

interface Props {
  apiItem: ApiItem;
}
