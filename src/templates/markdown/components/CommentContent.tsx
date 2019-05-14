import {
  DocCodeSpan,
  DocFencedCode,
  DocHtmlEndTag,
  DocHtmlStartTag,
  DocNode,
  DocNodeKind,
  DocNodeTransforms,
  DocParagraph,
  DocPlainText,
  DocSection
} from '@microsoft/tsdoc';
import React, { FC, Fragment, ReactElement } from 'react';
import { trim } from '../../utils';

export const CommentContent: FC<Props> = ({ docSection, inArray = false }) => {
  if (docSection === undefined) {
    return null;
  }
  const nodes = docSection.getChildNodes();
  return writeNodes(nodes, inArray);
};

interface Props {
  docSection: DocSection | undefined;
  inArray?: boolean;
}

function writeNode(
  node: DocNode,
  inArray: boolean,
  previousSibling: DocNode | undefined
): ReactElement | string {
  switch (node.kind) {
    case DocNodeKind.CodeSpan:
      return `\`${(node as DocCodeSpan).code}\``;

    case DocNodeKind.FencedCode:
      const code = node as DocFencedCode;
      return `\`\`\`${code.language}\n${trim(code.code)}\n\`\`\``;

    case DocNodeKind.HtmlStartTag:
    case DocNodeKind.HtmlEndTag:
      return (node as DocHtmlStartTag | DocHtmlEndTag).emitAsHtml();

    case DocNodeKind.LinkTag:
      // TODO to handle
      return '';

    case DocNodeKind.Paragraph:
      const nodes = DocNodeTransforms.trimSpacesInParagraph(
        node as DocParagraph
      ).nodes;

      return inArray && previousSibling instanceof DocParagraph ? (
        <>
          <br />
          <br />
          {writeNodes(nodes, inArray)}
        </>
      ) : (
        writeNodes(nodes, inArray)
      );

    case DocNodeKind.PlainText:
      return (node as DocPlainText).text.replace(/ +/g, ' ');

    case DocNodeKind.SoftBreak:
      return inArray ? <br /> : '\n';

    default:
      return '';
  }
}

function writeNodes(nodes: readonly DocNode[], inArray: boolean): ReactElement {
  return (
    <>
      {nodes.map((node, index) => (
        <Fragment key={index}>
          {writeNode(node, inArray, nodes[index - 1])}
        </Fragment>
      ))}
    </>
  );
}
