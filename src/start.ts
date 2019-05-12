// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import colors from 'colors';
import os from 'os';
import { ApiDocumenterCommandLine } from './cli/ApiDocumenterCommandLine';

console.log(
  os.EOL +
    colors.bold(
      `api-documenter ${require('../package').version} ` +
        colors.cyan(' - https://api-extractor.com/') +
        os.EOL
    )
);

const parser = new ApiDocumenterCommandLine();

// CommandLineParser.execute() should never reject the promise
parser.execute().catch(error => console.error(error.stack));
