import { ApiItemKind } from '@microsoft/api-extractor-model';

export const API_EXTRACTOR_BASE_CONFIG = {
  $schema:
    'https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json',
  apiReport: {
    enabled: false
  },
  docModel: {
    enabled: true
  },
  dtsRollup: {
    enabled: false
  },
  tsdocMetadata: {
    enabled: false
  },
  messages: {
    compilerMessageReporting: {
      default: {
        logLevel: 'warning'
      }
    },
    extractorMessageReporting: {
      default: {
        logLevel: 'warning'
      }
    },
    tsdocMessageReporting: {
      default: {
        logLevel: 'warning'
      }
    }
  }
};

export const DOCUMENTATION_TITLE = 'API Documentation';

export const PAGE_ITEM_KINDS = [
  ApiItemKind.Class,
  ApiItemKind.Enum,
  ApiItemKind.Function,
  ApiItemKind.Interface,
  ApiItemKind.Method,
  ApiItemKind.Namespace,
  ApiItemKind.Package,
  ApiItemKind.TypeAlias
];
