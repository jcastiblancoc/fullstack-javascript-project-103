import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/genDiff.js';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFixtureFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff flat YAML files', () => {
  const expectedOutput = readFixtureFile('expected_output.txt').trim().replace(/\r\n/g, '\n');
  const result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml')).trim().replace(/\r\n/g, '\n');

  console.log('Resultado generado:\n', result); // <-- Esto nos ayudará a ver la diferencia exacta
  console.log('Esperado:\n', expectedOutput);

  expect(result).toEqual(expectedOutput);
});

test('gendiff flat JSON files', () => {
  const expectedOutput = readFixtureFile('expected_output.txt').trim().replace(/\r\n/g, '\n');
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')).trim().replace(/\r\n/g, '\n');

  console.log('Resultado generado:\n', result); // <-- Esto nos ayudará a ver la diferencia exacta
  console.log('Esperado:\n', expectedOutput);

  expect(result).toEqual(expectedOutput);
});

test('parse throws error for unsupported file format', () => {
  const invalidFilePath = getFixturePath('file.unsupported');

  expect(() => parse(invalidFilePath)).toThrow(Error);
  expect(() => parse(invalidFilePath)).toThrow(`Unsupported file format: ${invalidFilePath}`);
});