import formatStylish from './formatters/stylish.js';
import formatPlain from './formatters/plain.js';
import formatJson from './formatters/json.js';

const formatDiff = (diffTree, format) => {
    switch (format) {
        case 'stylish':
            return formatStylish(diffTree);
        case 'plain':
            return formatPlain(diffTree);
        case 'json':
            return formatJson(diffTree);
        default:
            throw new Error(`Unsupported format: ${format}`);
    }
};

export default formatDiff;
