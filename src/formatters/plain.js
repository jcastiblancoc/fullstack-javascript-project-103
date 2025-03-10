const formatPlain = (diffTree) => {
    const iter = (nodes, path) => {
        return nodes
            .map(({ key, type, value, oldValue, newValue, children }) => {
                const fullPath = path ? `${path}.${key}` : key;
                switch (type) {
                    case 'added':
                        return `Property '${fullPath}' was added with value: ${formatValue(value)}`;
                    case 'removed':
                        return `Property '${fullPath}' was removed`;
                    case 'modified':
                        return `Property '${fullPath}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
                    case 'nested':
                        return iter(children, fullPath); // 👈 Quitamos `.join('\n')` aquí
                    default:
                        return null;
                }
            })
            .filter((line) => line !== null) // Eliminamos valores nulos
            .flat(); // 👈 Aplanamos el array para evitar estructuras anidadas
    };

    return iter(diffTree, '').join('\n'); // 👈 Unimos el array en un string final
};

// Función auxiliar para manejar valores complejos
const formatValue = (value) => {
    if (typeof value === 'object' && value !== null) {
        return '[complex value]';
    }
    return typeof value === 'string' ? `'${value}'` : String(value);
};

export default formatPlain;
