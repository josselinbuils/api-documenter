/* eslint-disable @typescript-eslint/no-var-requires */
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

describe('api-documenter', () => {
  describe('should generate doc', () => {
    const resultFiles = [
      'ListManager.md',
      'README.md',
      'useDynamicRef.md',
      'useEventListener.md',
      'useKeyMap.md',
      'useLazy.md',
      'useList.md'
    ];

    childProcess.execFileSync(
      path.join(process.cwd(), 'bin/api-documenter'),
      [
        '--input-file',
        '__tests__/__fixtures__/index.d.ts',
        '--output-folder',
        '__tests__/result'
      ],
      { stdio: 'inherit' }
    );

    it.each(resultFiles)('%s should match snapshot', file => {
      expect(
        fs.readFileSync(path.join(__dirname, 'result', file), 'utf8')
      ).toMatchSnapshot();
    });
  });
});
