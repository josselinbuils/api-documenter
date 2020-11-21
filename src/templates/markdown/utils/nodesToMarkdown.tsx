import {
  DocCodeSpan,
  DocErrorText,
  DocEscapedText,
  DocFencedCode,
  DocHtmlEndTag,
  DocHtmlStartTag,
  DocLinkTag,
  DocNode,
  DocNodeKind,
  DocNodeTransforms,
  DocParagraph,
  DocPlainText,
} from '@microsoft/tsdoc';
import React, { Fragment, ReactElement } from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { CodeSpan } from '../components/CodeSpan';
import { Link } from '../components/Link';

export function nodesToMarkdown(
  nodes: readonly DocNode[],
  inArray: boolean
): ReactElement {
  return (
    <>
      {nodes.map((node, index) => (
        <Fragment key={index}>
          {nodeToMarkdown(node, inArray, nodes[index - 1])}
        </Fragment>
      ))}
    </>
  );
}

function nodeToMarkdown(
  node: DocNode,
  inArray: boolean,
  previousSibling: DocNode | undefined
): ReactElement | string {
  switch (node.kind) {
    case DocNodeKind.CodeSpan:
      return <CodeSpan>{(node as DocCodeSpan).code}</CodeSpan>;

    case DocNodeKind.EscapedText:
      return removeConsecutiveSpaces((node as DocEscapedText).decodedText);

    case DocNodeKind.ErrorText:
      return removeConsecutiveSpaces((node as DocErrorText).text);

    case DocNodeKind.FencedCode: {
      const fencedCode = node as DocFencedCode;
      return (
        <CodeBlock language={fencedCode.language}>
          {trim(fencedCode.code)}
        </CodeBlock>
      );
    }

    case DocNodeKind.HtmlStartTag:
    case DocNodeKind.HtmlEndTag:
      return (node as DocHtmlStartTag | DocHtmlEndTag).emitAsHtml();

    case DocNodeKind.LinkTag: {
      const { linkText, urlDestination } = node as DocLinkTag;
      const trimmedLinkText = removeConsecutiveSpaces(linkText || '');

      return urlDestination !== undefined ? (
        <Link href={urlDestination}>{trimmedLinkText || urlDestination}</Link>
      ) : (
        <>{trimmedLinkText}</>
      );
    }

    case DocNodeKind.Paragraph: {
      const { nodes } = DocNodeTransforms.trimSpacesInParagraph(
        node as DocParagraph
      );

      return inArray && previousSibling instanceof DocParagraph ? (
        <>
          <br />
          <br />
          {nodesToMarkdown(nodes, inArray)}
        </>
      ) : (
        nodesToMarkdown(nodes, inArray)
      );
    }

    case DocNodeKind.PlainText:
      return removeConsecutiveSpaces((node as DocPlainText).text);

    case DocNodeKind.SoftBreak:
      return inArray ? <br /> : '\n';

    default:
      return '';
  }
}

function removeConsecutiveSpaces(str: string): string {
  return str.replace(/ +/g, ' ');
}

function trim(str: string): string {
  return str.replace(/^\n+|\n+$/g, '').trim();
}
