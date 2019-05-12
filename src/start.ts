import colors from 'colors';
import program from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { applyInheritDoc, writeApiItemPage } from './utils';
import { ApiModel } from '@microsoft/api-extractor-model';

const startTime = Date.now();
const version = require(path.join(process.cwd(), 'package')).version;

program
  .version(version)
  .option(
    '-i, --input-folder <folder>',
    'folder containing the .api.json files to be  processed. Default value: temp.'
  )
  .option(
    '-o, --output-folder <folder>',
    'folder where the documentation will be written. /!\\ Everything in this ' +
      'folder will be deleted! Default value: doc.'
  )
  .parse(process.argv);

console.log(colors.bold(`API Documenter v${version}`));

const inputFolder = program.inputFolder || 'temp';
const outputFolder = program.outputFolder || 'doc';

const inputPath = path.join(process.cwd(), inputFolder);
const outputPath = path.join(process.cwd(), outputFolder);

if (!fs.existsSync(inputFolder)) {
  throw new Error(`The input folder does not exist: ${inputFolder}`);
}

// Build API model

console.log(`Build API model from ${colors.blue(inputFolder)}`);

const apiModel = new ApiModel();

fs.readdirSync(inputPath).forEach(filename => {
  if (filename.match(/\.api\.json$/i)) {
    apiModel.loadPackage(path.join(inputPath, filename));
  }
});

applyInheritDoc(apiModel, apiModel);

// Write documentation

console.log(`Write documentation in ${colors.blue(outputFolder)}`);
fs.emptyDirSync(outputPath);
writeApiItemPage(outputPath, apiModel.packages[0]);

console.log(`Done in ${Date.now() - startTime}ms`);
