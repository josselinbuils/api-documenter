import { DocNode, DocNodeKind, DocPlainText } from '@microsoft/tsdoc';

export function nodesToString(
  nodes: readonly DocNode[],
  inArray: boolean = false
) {
  const lineBreak = inArray ? '<br />' : '\n';

  return nodes
    .map((node, index) => {
      switch (node.kind) {
        case DocNodeKind.PlainText:
          return (node as DocPlainText).text;

        case DocNodeKind.SoftBreak:
          return index < nodes.length - 1 ? lineBreak : '';

        default:
          return '';
      }
    })
    .join('');
}
