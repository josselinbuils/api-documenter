import { DocSection } from '@microsoft/tsdoc';
import { FC } from 'react';
import { nodesToMarkdown } from '../utils';

export const CommentContent: FC<Props> = ({ docSection, inArray = false }) => {
  if (docSection === undefined) {
    return null;
  }
  const nodes = docSection.getChildNodes();
  return nodesToMarkdown(nodes, inArray);
};

interface Props {
  docSection: DocSection | undefined;
  inArray?: boolean;
}
