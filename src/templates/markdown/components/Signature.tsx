import { ApiItem } from '@microsoft/api-extractor-model';
import React, { FC } from 'react';
import { getSignature } from '../../utils';

export const Signature: FC<Props> = ({ apiItem }) => {
  const signature = getSignature(apiItem);
  return signature ? <>{`\n\`\`\`typescript\n${signature}\n\`\`\`\n`}</> : null;
};

interface Props {
  apiItem: ApiItem;
}
