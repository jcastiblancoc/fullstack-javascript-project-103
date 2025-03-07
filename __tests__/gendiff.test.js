import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFixture = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

test('gendiff flat JSON', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    const expected = readFixture('expected_output.txt');

    const result = genDiff(file1, file2);

    console.log('Received:', result);
    console.log('Expected:', expected);
    console.log('Are they equal?', result === expected);

    expect(result.trim()).toEqual(expected);
});
