import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getAbsolutePath = (filepath) => path.resolve(__dirname, '__tests__', filepath);

const parseFile = (filepath) => {
    const absolutePath = getAbsolutePath(filepath);
    const content = fs.readFileSync(absolutePath, 'utf-8');

    const ext = path.extname(filepath).toLowerCase();
    if (ext === '.json') {
        return JSON.parse(content);
    }
    if (ext === '.yaml' || ext === '.yml') {
        return yaml.load(content);
    }
    throw new Error(`Formato no soportado: ${ext}`);
};

export default parseFile;
