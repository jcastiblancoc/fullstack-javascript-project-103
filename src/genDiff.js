import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath1, filepath2) => {
    const absolutePath1 = getAbsolutePath(filepath1);
    const absolutePath2 = getAbsolutePath(filepath2);

    console.log('🛠️ Verificando rutas antes de leer archivos:');
    console.log('🔹 Ruta 1:', absolutePath1);
    console.log('🔹 Ruta 2:', absolutePath2);

    try {
        const data1 = readFileSync(absolutePath1, 'utf-8');
        const data2 = readFileSync(absolutePath2, 'utf-8');

        console.log('✅ Archivos leídos correctamente');
        console.log('📄 Contenido 1:', data1);
        console.log('📄 Contenido 2:', data2);

        const parsedData1 = parse(data1, filepath1);
        const parsedData2 = parse(data2, filepath2);

        console.log('✅ Archivos parseados:', parsedData1, parsedData2);
        
        return 'Diferencia calculada (pendiente de implementación)';
    } catch (error) {
        console.error('❌ Error al leer los archivos:', error);
        process.exit(1);
    }
};

export default genDiff;
