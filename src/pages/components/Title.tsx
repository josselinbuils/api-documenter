import * as React from 'react';

export const Title: React.FC<Props> = ({ children, level = 1 }) => (
  <>
    {`\n\n${new Array(level + 1).join('#')} `}
    {children}
  </>
);

interface Props {
  level: number;
}
