import { DocNodeKind, DocSection } from '@microsoft/tsdoc';

export function appendAndMergeSection(
  output: DocSection,
  docSection: DocSection
): void {
  let firstNode: boolean = true;
  for (const node of docSection.nodes) {
    if (firstNode) {
      if (node.kind === DocNodeKind.Paragraph) {
        output.appendNodesInParagraph(node.getChildNodes());
        firstNode = false;
        continue;
      }
    }
    firstNode = false;

    output.appendNode(node);
  }
}
