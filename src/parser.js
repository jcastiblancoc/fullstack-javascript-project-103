import fs from 'fs';
import path from 'path';

/**
 * Lee y analiza un archivo JSON.
 * @param {string} filepath - Ruta del archivo.
 * @returns {Object} - Contenido del archivo como un objeto.
 */
const parseFile = (filepath) => {
    const absolutePath = path.resolve(process.cwd(), filepath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileContent);
};

export default parseFile;
