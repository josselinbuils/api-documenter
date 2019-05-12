import {
  DocNode,
  DocNodeKind,
  DocPlainText,
  DocSection
} from '@microsoft/tsdoc';

export function getCommentText(
  docSection: DocSection | undefined,
  inArray: boolean = false
) {
  if (docSection === undefined) {
    return '';
  }
  return nodesToString(docSection.nodes[0].getChildNodes(), inArray);
}

export function nodesToString(
  nodes: readonly DocNode[],
  useBrLineBreaks: boolean = false
) {
  let str = nodes
    .map(node => {
      switch (node.kind) {
        case DocNodeKind.PlainText:
          return (node as DocPlainText).text;

        case DocNodeKind.SoftBreak:
          return '\n';

        default:
          return '';
      }
    })
    .join('')
    .replace(/ {2}/g, ' ')
    .replace(/^\n+|\n+$/g, '')
    .trim();

  if (useBrLineBreaks) {
    str = str.replace(/\n/g, '<br />');
  }

  return str;
}
