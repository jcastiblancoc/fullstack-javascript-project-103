import _ from 'lodash';
import parseFile from './parser.js';

/**
 * Genera la diferencia entre dos archivos JSON.
 * @param {string} filepath1 - Ruta del primer archivo.
 * @param {string} filepath2 - Ruta del segundo archivo.
 * @returns {string} - Diferencias en formato de texto.
 */
const genDiff = (filepath1, filepath2) => {
    const data1 = parseFile(filepath1);
    const data2 = parseFile(filepath2);

    const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2))); // Obtener claves ordenadas

    const diff = keys.map((key) => {
        if (!Object.hasOwn(data2, key)) {
            return `  - ${key}: ${data1[key]}`; // Clave solo en el primer archivo
        }
        if (!Object.hasOwn(data1, key)) {
            return `  + ${key}: ${data2[key]}`; // Clave solo en el segundo archivo
        }
        if (data1[key] !== data2[key]) {
            return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`; // Clave con valores diferentes
        }
        return `    ${key}: ${data1[key]}`; // Clave con el mismo valor en ambos archivos
    });

    return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;
