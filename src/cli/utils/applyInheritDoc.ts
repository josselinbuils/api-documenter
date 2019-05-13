import {
  ApiDocumentedItem,
  ApiItem,
  ApiItemContainerMixin,
  ApiModel
} from '@microsoft/api-extractor-model';
import { DocComment } from '@microsoft/tsdoc';
import colors from 'colors';

// TODO: This is a temporary workaround.  The long term plan is for API
// Extractor's DocCommentEnhancer to apply all @inheritDoc tags before the
// .api.json file is written. See DocCommentEnhancer.applyInheritDoc() for more
// info.
export function applyInheritDoc(apiItem: ApiItem, apiModel: ApiModel): void {
  if (apiItem instanceof ApiDocumentedItem) {
    if (apiItem.tsdocComment) {
      const inheritDocTag = apiItem.tsdocComment.inheritDocTag;

      if (inheritDocTag && inheritDocTag.declarationReference) {
        // Attempt to resolve the declaration reference
        const result = apiModel.resolveDeclarationReference(
          inheritDocTag.declarationReference,
          apiItem
        );

        if (result.errorMessage) {
          console.log(
            colors.yellow(
              `Warning: Unresolved @inheritDoc tag for ${
                apiItem.displayName
              }: ${result.errorMessage}`
            )
          );
        } else {
          if (
            result.resolvedApiItem instanceof ApiDocumentedItem &&
            result.resolvedApiItem.tsdocComment &&
            result.resolvedApiItem !== apiItem
          ) {
            copyInheritedDocs(
              apiItem.tsdocComment,
              result.resolvedApiItem.tsdocComment
            );
          }
        }
      }
    }
  }

  // Recurse members
  if (ApiItemContainerMixin.isBaseClassOf(apiItem)) {
    for (const member of apiItem.members) {
      applyInheritDoc(member, apiModel);
    }
  }
}

/**
 * Copy the content from `sourceDocComment` to `targetDocComment`.
 * This code is borrowed from DocCommentEnhancer as a temporary workaround.
 */
function copyInheritedDocs(
  targetDocComment: DocComment,
  sourceDocComment: DocComment
): void {
  targetDocComment.summarySection = sourceDocComment.summarySection;
  targetDocComment.remarksBlock = sourceDocComment.remarksBlock;
  targetDocComment.params.clear();

  for (const param of sourceDocComment.params) {
    targetDocComment.params.add(param);
  }

  for (const typeParam of sourceDocComment.typeParams) {
    targetDocComment.typeParams.add(typeParam);
  }

  targetDocComment.returnsBlock = sourceDocComment.returnsBlock;
  targetDocComment.inheritDocTag = undefined;
}
