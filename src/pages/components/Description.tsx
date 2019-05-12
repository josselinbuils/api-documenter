import React, { FC } from 'react';
import { DocComment } from '@microsoft/tsdoc';
import { getCommentText } from '../../utils';

export const Description: FC<Props> = ({ comment }) => {
  return comment !== undefined ? (
    <>
      {'\n\n'}
      {getCommentText(comment)}
    </>
  ) : null;
};

interface Props {
  comment: DocComment | undefined;
}
