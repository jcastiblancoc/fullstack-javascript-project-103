import { readFileSync } from 'fs';
import path from 'path';
import { genDiff } from '../bin/gendiff.js';

const getFixturePath = (filename) => path.join('__tests__/__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

test('Comparación de archivos JSON anidados con formato stylish', () => {
  const expectedDiff = readFixture('expected_diff.txt');
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toBe(expectedDiff);
});

test('Comparación de archivos YAML anidados con formato stylish', () => {
  const expectedDiff = readFixture('expected_diff.txt'); // Mismo resultado esperado
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toBe(expectedDiff);
});

test('Comparación de archivos JSON con formato plain', () => {
  const expectedOutput = readFixture('expected_plain.txt');
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(expectedOutput);
});

test('Comparación de archivos YAML con formato plain', () => {
  const expectedOutput = readFixture('expected_plain.txt');
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toBe(expectedOutput);
});

test('Comparación de archivos JSON con formato JSON', () => {
  const expectedOutput = readFixture('expected_json.txt');
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toBe(expectedOutput);
});

test('Comparación de archivos YAML con formato JSON', () => {
  const expectedOutput = readFixture('expected_json.txt');
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toBe(expectedOutput);
});
