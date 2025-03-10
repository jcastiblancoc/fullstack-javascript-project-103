import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath1, filepath2) => {
    const absolutePath1 = getAbsolutePath(filepath1);
    const absolutePath2 = getAbsolutePath(filepath2);

    try {
        const data1 = readFileSync(absolutePath1, 'utf-8');
        const data2 = readFileSync(absolutePath2, 'utf-8');

        const format1 = path.extname(filepath1).slice(1);
        const format2 = path.extname(filepath2).slice(1);

        const parsedData1 = parse(data1, format1);
        const parsedData2 = parse(data2, format2);

        return { parsedData1, parsedData2 };
    } catch (error) {
        console.error('Error al leer los archivos:', error);
        process.exit(1);
    }
};

export default genDiff;
