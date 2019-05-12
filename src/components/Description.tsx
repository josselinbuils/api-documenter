import * as React from 'react';
import { DocComment } from '@microsoft/tsdoc';
import { getCommentText } from '../utils';

export const Description: React.FC<Props> = ({ comment }) => {
  return `\n\n${getCommentText(comment)}`;
};

interface Props {
  comment: DocComment;
}
