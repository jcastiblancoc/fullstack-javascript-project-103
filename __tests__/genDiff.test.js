import genDiff from '../src/genDiff.js';

test('Comparación de archivos JSON planos', () => {
    const file1 = '__fixtures__/file1.json';
    const file2 = '__fixtures__/file2.json';
    const expected = `{
  - follow: false
    host: codica.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(genDiff(file1, file2)).toBe(expected);
});
