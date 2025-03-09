import readFile from './fileReader.js';

const genDiff = (filepath1, filepath2) => {
    const data1 = readFile(filepath1);
    const data2 = readFile(filepath2);

    return {
        file1: data1,
        file2: data2,
    };
};

export default genDiff;
