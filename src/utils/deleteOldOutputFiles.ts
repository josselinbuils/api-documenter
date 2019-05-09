import { FileSystem } from '@microsoft/node-core-library';

export function deleteOldOutputFiles(outputFolder: string): void {
  console.log(`Deleting old output from ${outputFolder}`);
  FileSystem.ensureEmptyFolder(outputFolder);
}
