import {
  DocBlock,
  DocComment,
  DocNode,
  DocNodeKind,
  DocPlainText
} from '@microsoft/tsdoc';

export function getCommentText(
  comment: DocBlock | DocComment,
  inArray: boolean = false
) {
  if (comment === undefined) {
    return '';
  }
  const docSection =
    comment instanceof DocBlock ? comment.content : comment.summarySection;

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
    .replace(/^\n+|\n+$/g, '');

  if (useBrLineBreaks) {
    str = str.replace(/\n/g, '<br />');
  }

  return str;
}
