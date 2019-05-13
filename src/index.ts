import { ApiModel } from '@microsoft/api-extractor-model';
import childProcess from 'child_process';
import colors from 'colors';
import program from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { API_EXTRACTOR_BASE_CONFIG } from './constants';
import { applyInheritDoc, writeApiItemPage } from './utils';

const version = require(path.join(__dirname, '../package')).version;

program
  .version(version)
  .option(
    '-i, --input-file <file>',
    'entry .d.ts file. Default value: dist/index.d.ts.'
  )
  .option(
    '-o, --output-folder <folder>',
    'folder where the documentation will be written. /!\\ Everything in this ' +
      'folder will be deleted! Default value: doc.'
  )
  .parse(process.argv);

console.log(colors.bold(`API Documenter v${version}`));

const inputFile = program.inputFolder || 'dist/index.d.ts';
const outputFolder = program.outputFolder || 'doc';

const inputPath = path.join(process.cwd(), inputFile);
const outputPath = path.join(process.cwd(), outputFolder);

if (!fs.existsSync(inputFile)) {
  throw new Error(`The input file does not exist: ${inputFile}`);
}

// Creates or empty temporary folders

const tmpPath = path.join(process.cwd(), 'tmp');
const apiExtractorConfigPath = path.join(tmpPath, 'api-extractor.json');
const apiJsonFilePath = path.join(tmpPath, 'model.api.json');

fs.emptyDirSync(tmpPath);

// Extracts API

console.log(`Extracts API from ${colors.blue(inputFile)}`);

const apiExtractorConfig: any = {
  ...API_EXTRACTOR_BASE_CONFIG,
  mainEntryPointFilePath: inputPath
};
apiExtractorConfig.docModel.apiJsonFilePath = apiJsonFilePath;

fs.writeJSONSync(apiExtractorConfigPath, apiExtractorConfig);

childProcess.execSync(
  `api-extractor run --local --verbose -c "${apiExtractorConfigPath}"`
);

// Builds API model

console.log('Builds API model');

const apiModel = new ApiModel();
apiModel.loadPackage(apiJsonFilePath);
applyInheritDoc(apiModel, apiModel);

// Write documentation

console.log(`Writes documentation in ${colors.blue(outputFolder)}`);

fs.emptyDirSync(outputPath);
writeApiItemPage(outputPath, apiModel.packages[0]);

// Removes temporary folder
fs.removeSync(tmpPath);
