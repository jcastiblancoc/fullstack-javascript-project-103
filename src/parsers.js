import yaml from 'js-yaml';
import path from 'path';

const getFormat = (filepath) => {
    const ext = path.extname(filepath).slice(1);
    console.log(`Detectando formato de ${filepath}: ${ext}`); // TEMPORAL
    return ext;
};

const parse = (data, filepath) => {
    const format = getFormat(filepath);

    if (format === 'json') {
        return JSON.parse(data);
    }
    if (format === 'yml' || format === 'yaml') {
        return yaml.load(data);
    }

    throw new Error(`Unsupported format: ${format}`);
};

export default parse;
