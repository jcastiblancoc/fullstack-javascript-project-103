import _ from 'lodash';
import readFile from './fileReader.js';

const genDiff = (filepath1, filepath2) => {
    const obj1 = readFile(filepath1);
    const obj2 = readFile(filepath2);

    const allKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

    const diff = allKeys.map((key) => {
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

    return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;
