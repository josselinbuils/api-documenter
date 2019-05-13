import {
  DocCodeSpan,
  DocFencedCode,
  DocHtmlEndTag,
  DocHtmlStartTag,
  DocNode,
  DocNodeKind,
  DocPlainText
} from '@microsoft/tsdoc';

export function nodesToMarkdown(
  nodes: readonly DocNode[],
  useBrLineBreaks: boolean = false
) {
  let str = nodes
    .map(node => {
      switch (node.kind) {
        case DocNodeKind.CodeSpan:
          return `\`${(node as DocCodeSpan).code}\``;

        case DocNodeKind.FencedCode:
          const code = node as DocFencedCode;
          return `\`\`\`${code.language}\n${trim(code.code)}\n\`\`\``;

        case DocNodeKind.HtmlStartTag:
        case DocNodeKind.HtmlEndTag:
          return (node as DocHtmlStartTag | DocHtmlEndTag).emitAsHtml();

        case DocNodeKind.PlainText:
          return (node as DocPlainText).text.replace(/ +/g, ' ');

        case DocNodeKind.SoftBreak:
          return '\n';

        default:
          return '';
      }
    })
    .join('');

  str = trim(str);

  if (useBrLineBreaks) {
    str = str.replace(/\n/g, '<br />');
  }

  return str;
}

function trim(str: string): string {
  return str.replace(/^\n+|\n+$/g, '').trim();
}
