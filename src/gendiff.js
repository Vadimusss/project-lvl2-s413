import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseData from './parsers';

const getData = filePath => fs.readFileSync(filePath, 'utf-8');
const getFormat = filePath => path.extname(filePath).slice(1);

const genDiff = (first, second) => {
  const firstObject = parseData(getData(first), getFormat(first));
  const secondObject = parseData(getData(second), getFormat(second));

  const iter = (fst, scd) => {
    const unionKeys = _.union(Object.keys(fst), Object.keys(scd));

    return unionKeys.reduce((acc, key) => {
      if (!_.has(scd, key)) {
        return acc.concat({ type: 'settingDeleted', name: key, value: fst[key] });
      }

      if (!_.has(fst, key)) {
        return acc.concat({ type: 'settingAdded', name: key, value: scd[key] });
      }

      if (_.isObject(fst[key]) && _.isObject(scd[key])) {
        return acc.concat({ type: 'settingList', name: key, children: iter(fst[key], scd[key]) });
      }

      if (fst[key] !== scd[key]) {
        return acc.concat({
          type: 'settingModified', name: key, oldValue: fst[key], newValue: scd[key],
        });
      }

      return acc.concat({ type: 'settingUnmodified', name: key, value: scd[key] });
    }, []);
  };

  return { type: 'settingList', name: '', children: iter(firstObject, secondObject) };
};

export default genDiff;
