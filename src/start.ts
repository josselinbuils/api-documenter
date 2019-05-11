// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { PackageJsonLookup } from '@microsoft/node-core-library';
import * as colors from 'colors';
import * as os from 'os';
import { ApiDocumenterCommandLine } from './cli/ApiDocumenterCommandLine';

const myPackageVersion = PackageJsonLookup.loadOwnPackageJson(__dirname)
  .version;

console.log(
  os.EOL +
    colors.bold(
      `api-documenter ${myPackageVersion} ` +
        colors.cyan(' - https://api-extractor.com/') +
        os.EOL
    )
);

const parser = new ApiDocumenterCommandLine();

// CommandLineParser.execute() should never reject the promise
parser.execute().catch(error => console.error(error.stack));
