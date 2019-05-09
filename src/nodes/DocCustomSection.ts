import { DocNode, DocSection } from '@microsoft/tsdoc';
import { CustomDocNodes } from './CustomDocNodeKind';
import { DocHeading } from './DocHeading';

export class DocCustomSection extends DocSection {
  constructor() {
    super({ configuration: CustomDocNodes.configuration });
  }

  appendNodeWithHeading(title: string, node: DocNode) {
    this.appendNode(new DocHeading({ title }));
    this.appendNode(node);
  }

  appendSection(docSection: DocSection): void {
    for (const node of docSection.nodes) {
      this.appendNode(node);
    }
  }
}
