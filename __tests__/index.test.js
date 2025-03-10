import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (filename) => {
  const possibleExtensions = filename.includes('.') ? [''] : ['.yaml', '.yml'];
  for (const ext of possibleExtensions) {
    const fullPath = path.join(__dirname, '../', '__fixtures__', `${filename}${ext}`);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }
  throw new Error(`File not found: ${filename}(.yaml | .yml)`);
};

const readTestsFiles = (filename) => fs.readFileSync(getPath(filename), 'utf-8').trim();

const stylishResult = readTestsFiles('stylish-result.txt');
const plainResult = readTestsFiles('plain-result.txt');
const jsonResult = readTestsFiles('json-result.json');

describe('gendiff', () => {
  test('Format for stylish Result - YAML File', () => {
    const filepath1 = getPath('file1');
    const filepath2 = getPath('file2');
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(stylishResult);
  });

  test('Format for plain Result - YAML File', () => {
    const filepath1 = getPath('file1');
    const filepath2 = getPath('file2');
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainResult);
  });

  test('Format for JSON Result - JSON File', () => {
    const filepath1 = getPath('file1.json');
    const filepath2 = getPath('file2.json');
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(jsonResult);
  });
});
