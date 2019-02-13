import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseData from './parsers';

const getData = filePath => fs.readFileSync(filePath, 'utf-8');
const getFormat = filePath => path.extname(filePath).slice(1);

export default (first, second) => {
  const firstObject = parseData(getData(first), getFormat(first));
  const secondObject = parseData(getData(second), getFormat(second));
  const unionKeys = _.union(Object.keys(firstObject), Object.keys(secondObject));

  const settingList = unionKeys.map((key) => {
    if (!_.has(secondObject, key)) {
      return `  -${key}: ${firstObject[key]}`;
    }

    if (!_.has(firstObject, key)) {
      return `  +${key}: ${secondObject[key]}`;
    }

    if (firstObject[key] !== secondObject[key]) {
      return `  -${key}: ${firstObject[key]}\n  +${key}: ${secondObject[key]}`;
    }

    return `   ${key}: ${firstObject[key]}`;
  }).join('\n');

  return `{\n${settingList}\n}`;
};
