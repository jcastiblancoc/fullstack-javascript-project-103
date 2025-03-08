import { test, expect } from '@jest/globals';
import genDiff from '../src/gendiff.js';

test('gendiff flat JSON', () => {
    const filepath1 = '__fixtures__/file1.json';
    const filepath2 = '__fixtures__/file2.json';
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

test('gendiff flat YAML', () => {
    const filepath1 = '__fixtures__/file1.yml';
    const filepath2 = '__fixtures__/file2.yml';
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
