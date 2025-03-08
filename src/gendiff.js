import path from 'path';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';

const getAbsolutePath = (filepath) => path.resolve(__dirname, '..', filepath);

const parseFile = (filepath) => {
    const absolutePath = getAbsolutePath(filepath);
    const fileContent = readFileSync(absolutePath, 'utf-8');

    if (filepath.endsWith('.json')) {
        return JSON.parse(fileContent);
    }
    if (filepath.endsWith('.yml') || filepath.endsWith('.yaml')) {
        return yaml.load(fileContent);
    }
    throw new Error(`Unsupported file format: ${filepath}`);
};

const genDiff = (filepath1, filepath2) => {
    const obj1 = parseFile(filepath1);
    const obj2 = parseFile(filepath2);

    const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort();
    const result = keys.map((key) => {
        if (!Object.hasOwn(obj1, key)) {
            return `  + ${key}: ${obj2[key]}`;
        }
        if (!Object.hasOwn(obj2, key)) {
            return `  - ${key}: ${obj1[key]}`;
        }
        if (obj1[key] !== obj2[key]) {
            return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
        }
        return `    ${key}: ${obj1[key]}`;
    });

    return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
