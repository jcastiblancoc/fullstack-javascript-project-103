import _ from 'lodash';

const stringify = (value, depth) => {
    if (!_.isPlainObject(value)) return String(value);
    const indent = ' '.repeat(depth * 4);
    const entries = Object.entries(value)
        .map(([key, val]) => `${indent}    ${key}: ${stringify(val, depth + 1)}`)
        .join('\n');
    return `{\n${entries}\n${indent}}`;
};

const formatStylish = (tree, depth = 1) => {
    const indent = ' '.repeat(depth * 4 - 2);
    const lines = tree.map((node) => {
        switch (node.type) {
            case 'nested':
                return `${indent}  ${node.key}: ${formatStylish(node.children, depth + 1)}`;
            case 'removed':
                return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;
            case 'added':
                return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
            case 'modified':
                return [
                    `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}`,
                    `${indent}+ ${node.key}: ${stringify(node.newValue, depth)}`,
                ].join('\n');
            case 'unchanged':
                return `${indent}  ${node.key}: ${stringify(node.value, depth)}`;
            default:
                throw new Error(`Unknown type: ${node.type}`);
        }
    });

    return `{\n${lines.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`;
};

export default formatStylish;
