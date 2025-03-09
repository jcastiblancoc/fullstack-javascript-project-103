const formatPlain = (diff) => {
    const iter = (nodes, path) =>
        nodes
            .flatMap(({ key, type, value, oldValue, newValue, children }) => {
                const fullPath = [...path, key].join('.');

                switch (type) {
                    case 'added':
                        return `Property '${fullPath}' was added with value: ${JSON.stringify(value)}`;
                    case 'removed':
                        return `Property '${fullPath}' was removed`;
                    case 'changed':
                        return `Property '${fullPath}' was updated. From ${JSON.stringify(oldValue)} to ${JSON.stringify(newValue)}`;
                    case 'nested':
                        return iter(children, [...path, key]);
                    case 'unchanged':
                        return [];
                    default:
                        throw new Error(`Unknown type: ${type}`);
                }
            })
            .join('\n');

    return iter(diff, []);
};

export default formatPlain;
