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

    // Obtener claves únicas ordenadas sin depender de Lodash
    const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();

    // Generar diferencias
    const diff = keys.map((key) => {
        const hasKey1 = Object.hasOwn(data1, key);
        const hasKey2 = Object.hasOwn(data2, key);

        if (!hasKey2) return `  - ${key}: ${data1[key]}`; // Solo en el primer archivo
        if (!hasKey1) return `  + ${key}: ${data2[key]}`; // Solo en el segundo archivo
        if (data1[key] !== data2[key]) {
            return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`; // Diferente en ambos
        }
        return `    ${key}: ${data1[key]}`; // Igual en ambos
    });

    return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;
