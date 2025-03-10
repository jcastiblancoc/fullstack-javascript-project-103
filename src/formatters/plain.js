import _ from 'lodash';
import {
  ADD_VALUE, CHANGED_VALUE, DELETED_VALUE, NESTED_VALUE, ROOT_VALUE, UNCHANGED_VALUE,
} from '../../src/constants.js';


const buildPropertyPath = (property, ancestors) => [...ancestors, property].join('.');
const formatValue = (value) => {
  if (value === null) return value;

  if (_.isObject(value)) return '[complex value]';

  return typeof value === 'string' ? `'${value}'` : String(value);
};

const nodeHandlers = {
  [ADD_VALUE]: (node, path) => `Property '${buildPropertyPath(node.key, path)}' was added with value: ${formatValue(node.value)}`,
  [CHANGED_VALUE]: ({ key, value1, value2 }, path) => {
    const propertyPath = buildPropertyPath(key, path);
    return `Property '${propertyPath}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`;
  },
  [DELETED_VALUE]: (node, path) => `Property '${buildPropertyPath(node.key, path)}' was removed`,
  // eslint-disable-next-line max-len
  [NESTED_VALUE]: ({ key, children }, path, traverse) => children.flatMap((child) => traverse(child, [...path, key])),
  // eslint-disable-next-line max-len
  [ROOT_VALUE]: ({ children }, path, traverse) => children.flatMap((child) => traverse(child, path)),
  [UNCHANGED_VALUE]: () => [],

};

const renderToPlainText = (tree) => {
  const traverse = (node, currentPath) => nodeHandlers[node.type](node, currentPath, traverse);
  return traverse(tree, []).join('\n');
};

export default renderToPlainText;
