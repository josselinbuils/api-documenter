import {
  ApiEnum,
  ApiItem,
  ApiItemKind,
  ApiParameterListMixin
} from '@microsoft/api-extractor-model';
import * as React from 'react';
import {
  EnumMemberTable,
  MemberTable,
  ParameterTable,
  PropertyTable
} from './tables';
import { filterApiItems, getEventItems, getPropertyItems } from '../utils';

export const Tables: React.FC<Props> = ({ apiItem }) => {
  switch (apiItem.kind) {
    case ApiItemKind.Class:
    case ApiItemKind.Interface:
      return (
        <>
          <PropertyTable
            propertyItems={getEventItems(apiItem)}
            propertyType="Event"
          />
          <PropertyTable
            propertyItems={getPropertyItems(apiItem)}
            propertyType="Property"
          />
          <MemberTable
            memberItems={filterApiItems(apiItem.members, ApiItemKind.Method)}
            memberType="Method"
          />
        </>
      );

    case ApiItemKind.Enum:
      return <EnumMemberTable apiEnum={apiItem as ApiEnum} />;

    case ApiItemKind.Method:
    case ApiItemKind.MethodSignature:
    case ApiItemKind.Function:
      return (
        <ParameterTable
          apiParameterListMixin={apiItem as ApiParameterListMixin}
        />
      );

    case ApiItemKind.Package:
      const members: [string, ApiItemKind][] = [
        ['Class', ApiItemKind.Class],
        ['Enum', ApiItemKind.Enum],
        ['Interface', ApiItemKind.Interface],
        ['Namespace', ApiItemKind.Namespace],
        ['Function', ApiItemKind.Function],
        ['Type Alias', ApiItemKind.TypeAlias],
        ['Variable', ApiItemKind.Variable]
      ];

      return (
        <>
          {members.map(([memberType, apiItemKind]) => (
            <>
              <MemberTable
                memberItems={filterApiItems(
                  apiItem.members[0].members,
                  apiItemKind
                )}
                memberType={memberType}
              />
            </>
          ))}
        </>
      );

    case ApiItemKind.Namespace:
    case ApiItemKind.EntryPoint:
    case ApiItemKind.Property:
    case ApiItemKind.PropertySignature:
    case ApiItemKind.TypeAlias:
    case ApiItemKind.Variable:
      break;

    default:
      throw new Error('Unsupported API item kind: ' + apiItem.kind);
  }
  return null;
};

interface Props {
  apiItem: ApiItem;
}
