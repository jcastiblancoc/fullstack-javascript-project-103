#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import buildDiffTree from '../src/buildDiff.js';
import formatDiff from '../src/index.js';

const parseFile = (filepath) => {
    const fullPath = path.resolve(process.cwd(), filepath);
    const ext = path.extname(fullPath).slice(1);
    const content = fs.readFileSync(fullPath, 'utf-8');

    return ext === 'json' ? JSON.parse(content) : yaml.load(content);
};

export const genDiff = (filepath1, filepath2, format = 'stylish') => {
    const obj1 = parseFile(filepath1);
    const obj2 = parseFile(filepath2);
    const diffTree = buildDiffTree(obj1, obj2);
    return formatDiff(diffTree, format);
};

const program = new Command();

program
    .name('gendiff')
    .description('Compara dos archivos JSON o YAML y muestra la diferencia')
    .version('1.0.0')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format <type>', 'formato de salida (stylish, plain)', 'stylish')
    .action((filepath1, filepath2, options) => {
        console.log(genDiff(filepath1, filepath2, options.format));
    });

if (import.meta.url === `file://${process.argv[1]}`) {
    program.parse();
}
