import {
  ApiItem,
  ApiItemKind,
  ApiParameterListMixin,
} from '@microsoft/api-extractor-model';

const excludedItemKinds = [
  ApiItemKind.EntryPoint,
  ApiItemKind.Model,
  ApiItemKind.Package,
];

export function getApiItemFilename(apiItem: ApiItem): string {
  let baseName = '';

  for (const hierarchyItem of apiItem.getHierarchy()) {
    // For overloaded methods, add a suffix such as "MyClass.myMethod_2".
    let qualifiedName = hierarchyItem.displayName;

    if (
      ApiParameterListMixin.isBaseClassOf(hierarchyItem) &&
      hierarchyItem.overloadIndex > 0
    ) {
      qualifiedName += `_${hierarchyItem.overloadIndex}`;
    }

    if (!excludedItemKinds.includes(hierarchyItem.kind)) {
      baseName += `${baseName.length > 0 ? '.' : ''}${qualifiedName}`;
    }
  }
  return baseName;
}
