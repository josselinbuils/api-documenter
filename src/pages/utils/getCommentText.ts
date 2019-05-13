import { DocSection } from '@microsoft/tsdoc';
import { nodesToMarkdown } from './nodesToMardown';

export function getCommentText(
  docSection: DocSection | undefined,
  inArray: boolean = false
): string {
  if (docSection === undefined) {
    return '';
  }
  return nodesToMarkdown(docSection.nodes[0].getChildNodes(), inArray);
}
