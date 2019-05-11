import * as React from 'react';
import { DocComment } from '@microsoft/tsdoc';
import { nodesToString } from '../utils';

export const Description: React.FC<Props> = ({ comment }) => {
  const description = nodesToString(
    comment.summarySection.nodes[0].getChildNodes()
  );
  return `\n\n${description}`;
};

interface Props {
  comment: DocComment;
}
