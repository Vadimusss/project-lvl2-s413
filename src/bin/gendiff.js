#!/usr/bin/env node
import commander from 'commander';
import has from 'lodash/has';
import fs from 'file-system';

const gendiff = (firstFile, secondFile) => {
  const firstObject = JSON.parse(fs.readFileSync(firstFile, 'utf-8'));
  const secondObject = JSON.parse(fs.readFileSync(secondFile, 'utf-8'));

  const deleted = Object.keys(firstObject).reduce((acc, key) => {
    if (has(secondObject, key)) {
      return acc;
    }

    return `${acc}\n  - ${key}: ${firstObject[key]}`;
  }, '');

  const modified = Object.keys(secondObject).reduce((acc, key) => {
    const firstValue = firstObject[key];
    const secondValue = secondObject[key];

    if (has(firstObject, key) && firstValue === secondValue) {
      return `${acc}\n    ${key}: ${secondObject[key]}`;
    }

    if (has(firstObject, key) && firstValue !== secondValue) {
      return `${acc}\n  + ${key}: ${secondValue}\n  - ${key}: ${firstValue}`;
    }

    return `${acc}\n  + ${key}: ${secondValue}`;
  }, '');

  return `{${modified}${deleted}\n}`;
};

commander
  .version('1.2.1')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .description('Compares two configuration files and shows a difference.')
  .action((firstPath, secondPath) => {
    gendiff(firstPath, secondPath);
  })
  .parse(process.argv);

export default gendiff;
