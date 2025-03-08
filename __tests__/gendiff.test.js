import { test, expect } from '@jest/globals';
import genDiff from '../src/gendiff.js';

describe.each([
    ['JSON', '__fixtures__/file1.json', '__fixtures__/file2.json'],
    ['YAML', '__fixtures__/file1.yml', '__fixtures__/file2.yml'],
])('gendiff flat %s', (format, filepath1, filepath2) => {
    test(`gendiff flat ${format}`, () => {
        const expected = `{
  - follow: false
    host: codica.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
        expect(genDiff(filepath1, filepath2)).toBe(expected);
    });
});
