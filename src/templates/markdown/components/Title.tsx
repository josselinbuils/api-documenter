import React, { FC } from 'react';

export const Title: FC<Props> = ({ children, level = 1 }) => (
  <>
    {`\n${new Array(level + 1).join('#')} `}
    {children}
    {'\n'}
  </>
);

interface Props {
  level?: number;
}
