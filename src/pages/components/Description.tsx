import * as React from 'react';
import { DocComment } from '@microsoft/tsdoc';
import { getCommentText } from '../../utils';

export const Description: React.FC<Props> = ({ comment }) => {
  return comment !== undefined ? `\n\n${getCommentText(comment)}` : null;
};

interface Props {
  comment: DocComment;
}
