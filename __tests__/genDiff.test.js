import { genDiff } from '../bin/gendiff.js';
import fs from 'fs';
import path from 'path';

const getFixturePath = (filename) => path.join('__tests__/__fixtures__', filename);

test('Comparación de archivos JSON anidados', () => {
  const expectedDiff = fs.readFileSync(getFixturePath('expected_diff.txt'), 'utf-8').trim();
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(expectedDiff);
});
