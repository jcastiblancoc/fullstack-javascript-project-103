import yaml from 'js-yaml';
import path from 'path';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

export default function parseFile(data, filepath) {
  const extension = path.extname(filepath).slice(1);
  const parser = parsers[extension];

  if (!parser) {
    throw new Error(`Unsupported file extension "${extension}".`);
  }

  try {
    return parser(data);
  } catch (error) {
    throw new Error(`Failed to parse file "${filepath}": ${error.message}`);
  }
}
