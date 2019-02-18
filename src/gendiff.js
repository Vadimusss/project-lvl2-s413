import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseData from './parsers';

const getData = filePath => fs.readFileSync(filePath, 'utf-8');
const getFormat = filePath => path.extname(filePath).slice(1);

const genDiff = (firstPath, secondPath) => {
  const firstObject = parseData(getData(firstPath), getFormat(firstPath));
  const secondObject = parseData(getData(secondPath), getFormat(secondPath));

  const iter = (firstData, secondData) => {
    const unionKeys = _.union(Object.keys(firstData), Object.keys(secondData));

    return unionKeys.reduce((acc, key) => {
      if (!_.has(secondData, key)) {
        return acc.concat({ type: 'deleted', name: key, value: firstData[key] });
      }

      if (!_.has(firstData, key)) {
        return acc.concat({ type: 'added', name: key, value: secondData[key] });
      }

      if (_.isObject(firstData[key]) && _.isObject(secondData[key])) {
        return acc.concat({ type: 'dataList', name: key, children: iter(firstData[key], secondData[key]) });
      }

      if (firstData[key] !== secondData[key]) {
        return acc.concat({
          type: 'modified', name: key, oldValue: firstData[key], newValue: secondData[key],
        });
      }

      return acc.concat({ type: 'unmodified', name: key, value: secondData[key] });
    }, []);
  };

  return { type: 'dataList', name: '', children: iter(firstObject, secondObject) };
};

export default genDiff;
