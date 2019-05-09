// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import {
  ApiModel,
  ApiItem,
  ApiEnum,
  ApiPackage,
  ApiItemKind,
  ApiReleaseTagMixin,
  ApiDocumentedItem,
  ApiClass,
  ReleaseTag,
  ApiStaticMixin,
  ApiPropertyItem,
  ApiInterface,
  ApiParameterListMixin,
  ApiReturnTypeMixin,
  ApiDeclaredItem,
  ApiNamespace
} from '@microsoft/api-extractor-model';
import {
  PackageName,
  FileSystem,
  NewlineKind
} from '@microsoft/node-core-library';
import {
  DocPlainText,
  DocLinkTag,
  TSDocConfiguration,
  StringBuilder,
  DocParagraph,
  DocCodeSpan,
  DocFencedCode,
  StandardTags,
  DocBlock
} from '@microsoft/tsdoc';
import * as path from 'path';
import { CustomMarkdownEmitter } from './CustomMarkdownEmitter';
import {
  CustomDocNodes,
  DocHeading,
  DocTable,
  DocEmphasisSpan,
  DocTableRow,
  DocTableCell,
  DocNoteBox,
  DocCustomSection
} from './nodes';
import {
  appendAndMergeSection,
  deleteOldOutputFiles,
  getApiItemFilename,
  getConciseSignature,
  getApiItemFilenameLink
} from './utils';

const SUPPORTED_ITEM_KINDS = [
  ApiItemKind.Class,
  ApiItemKind.Enum,
  ApiItemKind.Interface,
  ApiItemKind.Method,
  ApiItemKind.MethodSignature,
  ApiItemKind.Package,
  ApiItemKind.Function,
  ApiItemKind.Namespace,
  ApiItemKind.Property,
  ApiItemKind.PropertySignature,
  ApiItemKind.TypeAlias,
  ApiItemKind.Variable
];

/**
 * Renders API documentation in the Markdown file format.
 * For more info:  https://en.wikipedia.org/wiki/Markdown
 */
export class MarkdownDocumenter {
  private readonly apiModel: ApiModel;
  private readonly tsdocConfiguration: TSDocConfiguration;
  private readonly markdownEmitter: CustomMarkdownEmitter;
  private outputFolder: string;

  constructor(apiModel: ApiModel) {
    this.apiModel = apiModel;
    this.tsdocConfiguration = CustomDocNodes.configuration;
    this.markdownEmitter = new CustomMarkdownEmitter(this.apiModel);
  }

  generateFiles(outputFolder: string): void {
    this.outputFolder = outputFolder;

    console.log();
    deleteOldOutputFiles(this.outputFolder);

    for (const apiPackage of this.apiModel.packages) {
      console.log(`Writing ${apiPackage.name} package`);
      this.writeApiItemPage(apiPackage);
    }
  }

  private writeApiItemPage(apiItem: ApiItem): void {
    if (!SUPPORTED_ITEM_KINDS.includes(apiItem.kind)) {
      throw new Error('Unsupported API item kind: ' + apiItem.kind);
    }

    const configuration = this.tsdocConfiguration;
    const output = new DocCustomSection();

    this.writeBreadcrumb(output, apiItem);

    let title: string;

    if (apiItem.kind === ApiItemKind.Package) {
      const unscopedPackageName = PackageName.getUnscopedName(
        apiItem.displayName
      );
      title = `${unscopedPackageName} package`;
    } else {
      const scopedName = apiItem.getScopedNameWithinPackage();
      title = `${scopedName} ${apiItem.kind.toLowerCase()}`;
    }

    output.appendNode(new DocHeading({ title }));

    if (
      ApiReleaseTagMixin.isBaseClassOf(apiItem) &&
      apiItem.releaseTag === ReleaseTag.Beta
    ) {
      this.writeBetaWarning(output);
    }

    if (apiItem instanceof ApiDocumentedItem) {
      const tsdocComment = apiItem.tsdocComment;

      if (tsdocComment) {
        if (tsdocComment.deprecatedBlock) {
          output.appendNode(
            new DocNoteBox({ configuration: this.tsdocConfiguration }, [
              new DocParagraph({ configuration: this.tsdocConfiguration }, [
                new DocPlainText({
                  configuration: this.tsdocConfiguration,
                  text: 'Warning: This API is now obsolete. '
                })
              ]),
              ...tsdocComment.deprecatedBlock.content.nodes
            ])
          );
        }
        output.appendSection(tsdocComment.summarySection);
      }
    }

    if (apiItem instanceof ApiDeclaredItem) {
      if (apiItem.excerpt.text.length > 0) {
        output.appendNode(
          new DocParagraph({ configuration }, [
            new DocEmphasisSpan({ configuration, bold: true }, [
              new DocPlainText({ configuration, text: 'Signature:' })
            ])
          ])
        );
        output.appendNode(
          new DocFencedCode({
            configuration,
            code: apiItem.getExcerptWithModifiers(),
            language: 'typescript'
          })
        );
      }
    }

    switch (apiItem.kind) {
      case ApiItemKind.Class:
        this.writeClassTables(output, apiItem as ApiClass);
        break;

      case ApiItemKind.Enum:
        this.writeEnumTables(output, apiItem as ApiEnum);
        break;

      case ApiItemKind.Interface:
        this.writeInterfaceTables(output, apiItem as ApiInterface);
        break;

      case ApiItemKind.Method:
      case ApiItemKind.MethodSignature:
      case ApiItemKind.Function:
        this.writeParameterTables(output, apiItem as ApiParameterListMixin);
        break;

      case ApiItemKind.Namespace:
        this.writePackageOrNamespaceTables(output, apiItem as ApiNamespace);
        break;

      case ApiItemKind.Package:
        this.writePackageOrNamespaceTables(output, apiItem as ApiPackage);
        break;

      case ApiItemKind.Property:
      case ApiItemKind.PropertySignature:
      case ApiItemKind.TypeAlias:
      case ApiItemKind.Variable:
        break;

      default:
        throw new Error('Unsupported API item kind: ' + apiItem.kind);
    }

    if (apiItem instanceof ApiDocumentedItem) {
      const tsdocComment = apiItem.tsdocComment;

      if (tsdocComment) {
        // Write the @remarks block
        if (tsdocComment.remarksBlock) {
          output.appendNode(new DocHeading({ title: 'Remarks' }));
          output.appendSection(tsdocComment.remarksBlock.content);
        }

        // Write the @example blocks
        const exampleBlocks: DocBlock[] = tsdocComment.customBlocks.filter(
          x =>
            x.blockTag.tagNameWithUpperCase ===
            StandardTags.example.tagNameWithUpperCase
        );

        let exampleNumber = 1;
        for (const exampleBlock of exampleBlocks) {
          const heading =
            exampleBlocks.length > 1 ? `Example ${exampleNumber}` : 'Example';

          output.appendNode(new DocHeading({ title: heading }));
          output.appendSection(exampleBlock.content);

          exampleNumber++;
        }
      }
    }

    const filename = path.join(this.outputFolder, getApiItemFilename(apiItem));
    const stringBuilder = new StringBuilder();

    stringBuilder.append(
      '<!-- Do not edit this file. It is automatically generated by API Documenter. -->\n\n'
    );

    this.markdownEmitter.emit(stringBuilder, output, {
      contextApiItem: apiItem,
      onGetFilenameForApiItem: (apiItemForFilename: ApiItem) => {
        return getApiItemFilenameLink(apiItemForFilename);
      }
    });

    FileSystem.writeFile(filename, stringBuilder.toString(), {
      convertLineEndings: NewlineKind.Lf
    });
  }

  /**
   * GENERATE PAGE: PACKAGE or NAMESPACE
   */
  private writePackageOrNamespaceTables(
    output: DocCustomSection,
    apiContainer: ApiPackage | ApiNamespace
  ): void {
    const classesTable = new DocTable({
      headerTitles: ['Class', 'Description']
    });

    const enumerationsTable = new DocTable({
      headerTitles: ['Enumeration', 'Description']
    });

    const functionsTable = new DocTable({
      headerTitles: ['Function', 'Description']
    });

    const interfacesTable = new DocTable({
      headerTitles: ['Interface', 'Description']
    });

    const namespacesTable = new DocTable({
      headerTitles: ['Namespace', 'Description']
    });

    const variablesTable = new DocTable({
      headerTitles: ['Variable', 'Description']
    });

    const typeAliasesTable = new DocTable({
      headerTitles: ['Type Alias', 'Description']
    });

    const apiMembers =
      apiContainer.kind === ApiItemKind.Package
        ? (apiContainer as ApiPackage).entryPoints[0].members
        : (apiContainer as ApiNamespace).members;

    for (const apiMember of apiMembers) {
      const row = new DocTableRow([
        this.createTitleCell(apiMember),
        this.createDescriptionCell(apiMember)
      ]);

      switch (apiMember.kind) {
        case ApiItemKind.Class:
          classesTable.addRow(row);
          this.writeApiItemPage(apiMember);
          break;

        case ApiItemKind.Enum:
          enumerationsTable.addRow(row);
          this.writeApiItemPage(apiMember);
          break;

        case ApiItemKind.Interface:
          interfacesTable.addRow(row);
          this.writeApiItemPage(apiMember);
          break;

        case ApiItemKind.Namespace:
          namespacesTable.addRow(row);
          this.writeApiItemPage(apiMember);
          break;

        case ApiItemKind.Function:
          functionsTable.addRow(row);
          this.writeApiItemPage(apiMember);
          break;

        case ApiItemKind.TypeAlias:
          typeAliasesTable.addRow(row);
          this.writeApiItemPage(apiMember);
          break;

        case ApiItemKind.Variable:
          variablesTable.addRow(row);
          this.writeApiItemPage(apiMember);
          break;
      }
    }

    if (classesTable.rows.length > 0) {
      output.appendNodeWithHeading('Classes', classesTable);
    }

    if (enumerationsTable.rows.length > 0) {
      output.appendNodeWithHeading('Enumerations', enumerationsTable);
    }
    if (functionsTable.rows.length > 0) {
      output.appendNodeWithHeading('Functions', functionsTable);
    }

    if (interfacesTable.rows.length > 0) {
      output.appendNodeWithHeading('Interfaces', interfacesTable);
    }

    if (namespacesTable.rows.length > 0) {
      output.appendNodeWithHeading('Namespaces', namespacesTable);
    }

    if (variablesTable.rows.length > 0) {
      output.appendNodeWithHeading('Variables', variablesTable);
    }

    if (typeAliasesTable.rows.length > 0) {
      output.appendNodeWithHeading('Type Aliases', typeAliasesTable);
    }
  }

  /**
   * GENERATE PAGE: CLASS
   */
  private writeClassTables(output: DocCustomSection, apiClass: ApiClass): void {
    const eventsTable = new DocTable({
      headerTitles: ['Property', 'Modifiers', 'Type', 'Description']
    });

    const propertiesTable = new DocTable({
      headerTitles: ['Property', 'Modifiers', 'Type', 'Description']
    });

    const methodsTable = new DocTable({
      headerTitles: ['Method', 'Modifiers', 'Description']
    });

    for (const apiMember of apiClass.members) {
      switch (apiMember.kind) {
        case ApiItemKind.Method: {
          methodsTable.addRow(
            new DocTableRow([
              this.createTitleCell(apiMember),
              this.createModifiersCell(apiMember),
              this.createDescriptionCell(apiMember)
            ])
          );

          this.writeApiItemPage(apiMember);
          break;
        }
        case ApiItemKind.Property: {
          if ((apiMember as ApiPropertyItem).isEventProperty) {
            eventsTable.addRow(
              new DocTableRow([
                this.createTitleCell(apiMember),
                this.createModifiersCell(apiMember),
                this.createPropertyTypeCell(apiMember),
                this.createDescriptionCell(apiMember)
              ])
            );
          } else {
            propertiesTable.addRow(
              new DocTableRow([
                this.createTitleCell(apiMember),
                this.createModifiersCell(apiMember),
                this.createPropertyTypeCell(apiMember),
                this.createDescriptionCell(apiMember)
              ])
            );
          }

          this.writeApiItemPage(apiMember);
          break;
        }
      }
    }

    if (eventsTable.rows.length > 0) {
      output.appendNode(new DocHeading({ title: 'Events' }));
      output.appendNode(eventsTable);
    }

    if (propertiesTable.rows.length > 0) {
      output.appendNode(new DocHeading({ title: 'Properties' }));
      output.appendNode(propertiesTable);
    }

    if (methodsTable.rows.length > 0) {
      output.appendNode(new DocHeading({ title: 'Methods' }));
      output.appendNode(methodsTable);
    }
  }

  /**
   * GENERATE PAGE: ENUM
   */
  private writeEnumTables(output: DocCustomSection, apiEnum: ApiEnum): void {
    const configuration = this.tsdocConfiguration;

    const enumMembersTable = new DocTable({
      headerTitles: ['Member', 'Value', 'Description']
    });

    for (const apiEnumMember of apiEnum.members) {
      enumMembersTable.addRow(
        new DocTableRow([
          new DocTableCell([
            new DocParagraph({ configuration }, [
              new DocPlainText({
                configuration,
                text: getConciseSignature(apiEnumMember)
              })
            ])
          ]),

          new DocTableCell([
            new DocParagraph({ configuration }, [
              new DocCodeSpan({
                configuration,
                code: apiEnumMember.initializerExcerpt.text
              })
            ])
          ]),

          this.createDescriptionCell(apiEnumMember)
        ])
      );
    }

    if (enumMembersTable.rows.length > 0) {
      output.appendNode(new DocHeading({ title: 'Enumeration Members' }));
      output.appendNode(enumMembersTable);
    }
  }

  /**
   * GENERATE PAGE: INTERFACE
   */
  private writeInterfaceTables(
    output: DocCustomSection,
    apiClass: ApiInterface
  ): void {
    const eventsTable = new DocTable({
      headerTitles: ['Property', 'Type', 'Description']
    });

    const propertiesTable = new DocTable({
      headerTitles: ['Property', 'Type', 'Description']
    });

    const methodsTable = new DocTable({
      headerTitles: ['Method', 'Description']
    });

    for (const apiMember of apiClass.members) {
      switch (apiMember.kind) {
        case ApiItemKind.MethodSignature: {
          methodsTable.addRow(
            new DocTableRow([
              this.createTitleCell(apiMember),
              this.createDescriptionCell(apiMember)
            ])
          );

          this.writeApiItemPage(apiMember);
          break;
        }
        case ApiItemKind.PropertySignature: {
          if ((apiMember as ApiPropertyItem).isEventProperty) {
            eventsTable.addRow(
              new DocTableRow([
                this.createTitleCell(apiMember),
                this.createPropertyTypeCell(apiMember),
                this.createDescriptionCell(apiMember)
              ])
            );
          } else {
            propertiesTable.addRow(
              new DocTableRow([
                this.createTitleCell(apiMember),
                this.createPropertyTypeCell(apiMember),
                this.createDescriptionCell(apiMember)
              ])
            );
          }

          this.writeApiItemPage(apiMember);
          break;
        }
      }
    }

    if (eventsTable.rows.length > 0) {
      output.appendNodeWithHeading('Events', eventsTable);
    }

    if (propertiesTable.rows.length > 0) {
      output.appendNodeWithHeading('Properties', propertiesTable);
    }

    if (methodsTable.rows.length > 0) {
      output.appendNodeWithHeading('Methods', methodsTable);
    }
  }

  /**
   * GENERATE PAGE: FUNCTION-LIKE
   */
  private writeParameterTables(
    output: DocCustomSection,
    apiParameterListMixin: ApiParameterListMixin
  ): void {
    const configuration = this.tsdocConfiguration;

    const parametersTable = new DocTable({
      headerTitles: ['Parameter', 'Type', 'Description']
    });

    for (const apiParameter of apiParameterListMixin.parameters) {
      const parameterDescription = new DocCustomSection();

      if (apiParameter.tsdocParamBlock) {
        parameterDescription.appendSection(
          apiParameter.tsdocParamBlock.content
        );
      }

      parametersTable.addRow(
        new DocTableRow([
          new DocTableCell([
            new DocParagraph({ configuration }, [
              new DocPlainText({ configuration, text: apiParameter.name })
            ])
          ]),
          new DocTableCell([
            new DocParagraph({ configuration }, [
              new DocCodeSpan({
                configuration,
                code: apiParameter.parameterTypeExcerpt.text
              })
            ])
          ]),
          new DocTableCell(parameterDescription.nodes)
        ])
      );
    }

    if (parametersTable.rows.length > 0) {
      output.appendNodeWithHeading('Parameters', parametersTable);
    }

    if (ApiReturnTypeMixin.isBaseClassOf(apiParameterListMixin)) {
      const returnTypeExcerpt = apiParameterListMixin.returnTypeExcerpt;
      output.appendNode(
        new DocParagraph({ configuration }, [
          new DocEmphasisSpan({ configuration, bold: true }, [
            new DocPlainText({ configuration, text: 'Returns:' })
          ])
        ])
      );

      output.appendNode(
        new DocParagraph({ configuration }, [
          new DocCodeSpan({
            configuration,
            code: returnTypeExcerpt.text.trim() || '(not declared)'
          })
        ])
      );

      // noinspection SuspiciousTypeOfGuard
      if (
        apiParameterListMixin instanceof ApiDocumentedItem &&
        apiParameterListMixin.tsdocComment &&
        apiParameterListMixin.tsdocComment.returnsBlock
      ) {
        output.appendSection(
          apiParameterListMixin.tsdocComment.returnsBlock.content
        );
      }
    }
  }

  private createTitleCell(apiItem: ApiItem): DocTableCell {
    const configuration = this.tsdocConfiguration;

    return new DocTableCell([
      new DocParagraph({ configuration }, [
        new DocLinkTag({
          configuration,
          tagName: '@link',
          linkText: getConciseSignature(apiItem),
          urlDestination: getApiItemFilenameLink(apiItem)
        })
      ])
    ]);
  }

  /**
   * This generates a DocTableCell for an ApiItem including the summary section and "(BETA)" annotation.
   *
   * @remarks
   * We mostly assume that the input is an ApiDocumentedItem, but it's easier to perform this as a runtime
   * check than to have each caller perform a type cast.
   */
  private createDescriptionCell(apiItem: ApiItem): DocTableCell {
    const configuration = this.tsdocConfiguration;
    const section = new DocCustomSection();

    if (
      ApiReleaseTagMixin.isBaseClassOf(apiItem) &&
      apiItem.releaseTag === ReleaseTag.Beta
    ) {
      section.appendNodesInParagraph([
        new DocEmphasisSpan({ configuration, bold: true, italic: true }, [
          new DocPlainText({ configuration, text: '(BETA)' })
        ]),
        new DocPlainText({ configuration, text: ' ' })
      ]);
    }

    if (
      apiItem instanceof ApiDocumentedItem &&
      apiItem.tsdocComment !== undefined
    ) {
      appendAndMergeSection(section, apiItem.tsdocComment.summarySection);
    }

    return new DocTableCell(section.nodes);
  }

  private createModifiersCell(apiItem: ApiItem): DocTableCell {
    const configuration = this.tsdocConfiguration;
    const section = new DocCustomSection();

    if (ApiStaticMixin.isBaseClassOf(apiItem) && apiItem.isStatic) {
      section.appendNodeInParagraph(
        new DocCodeSpan({ configuration, code: 'static' })
      );
    }

    return new DocTableCell(section.nodes);
  }

  private createPropertyTypeCell(apiItem: ApiItem): DocTableCell {
    const configuration = this.tsdocConfiguration;
    const section = new DocCustomSection();

    if (apiItem instanceof ApiPropertyItem) {
      section.appendNodeInParagraph(
        new DocCodeSpan({
          configuration,
          code: apiItem.propertyTypeExcerpt.text
        })
      );
    }

    return new DocTableCell(section.nodes);
  }

  private writeBreadcrumb(output: DocCustomSection, apiItem: ApiItem): void {
    output.appendNodeInParagraph(
      new DocLinkTag({
        configuration: this.tsdocConfiguration,
        tagName: '@link',
        linkText: 'Home',
        urlDestination: '../README.md'
      })
    );

    for (const hierarchyItem of apiItem.getHierarchy()) {
      switch (hierarchyItem.kind) {
        case ApiItemKind.Model:
        case ApiItemKind.EntryPoint:
          // We don't show the model as part of the breadcrumb because it is the root-level container.
          // We don't show the entry point because today API Extractor doesn't support multiple entry points;
          // this may change in the future.
          break;
        default:
          output.appendNodesInParagraph([
            new DocPlainText({
              configuration: this.tsdocConfiguration,
              text: ' > '
            }),
            new DocLinkTag({
              configuration: this.tsdocConfiguration,
              tagName: '@link',
              linkText: hierarchyItem.displayName,
              urlDestination: getApiItemFilenameLink(hierarchyItem)
            })
          ]);
      }
    }
  }

  private writeBetaWarning(output: DocCustomSection): void {
    const configuration = this.tsdocConfiguration;
    const betaWarning =
      'This API is provided as a preview for developers and may change based ' +
      'on feedback that we receive. Do not use this API in a production ' +
      'environment.';

    output.appendNode(
      new DocNoteBox({ configuration }, [
        new DocParagraph({ configuration }, [
          new DocPlainText({ configuration, text: betaWarning })
        ])
      ])
    );
  }
}
