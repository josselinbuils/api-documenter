import * as React from 'react';
import { ApiItem } from '@microsoft/api-extractor-model';
import { getSignature } from '../../utils';

export const Signature: React.FC<Props> = ({ apiItem }) => {
  const signature = getSignature(apiItem);
  return signature
    ? `\n\n**Signature:**\n\n\`\`\`typescript\n${signature}\n\`\`\``
    : null;
};

interface Props {
  apiItem: ApiItem;
}
