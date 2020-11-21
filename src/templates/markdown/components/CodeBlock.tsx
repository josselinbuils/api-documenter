import React, { FC } from 'react';

export const CodeBlock: FC<Props> = ({ children, language }) => {
  return (
    <>
      ```
      {language}
      {'\n'}
      {children}
      {'\n'}
      ```
    </>
  );
};

interface Props {
  language: string;
}
