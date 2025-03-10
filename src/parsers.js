import yaml from 'js-yaml';

const getFormat = (filepath) => filepath.split('.').pop();

const parse = (data, filepath) => {
  const format = getFormat(filepath);

  if (format === 'json') {
    return JSON.parse(data);
  }
  if (format === 'yml' || format === 'yaml') {
    return yaml.load(data);
  }

  throw new Error(`Unsupported format: ${format}`);
};

export default parse;
