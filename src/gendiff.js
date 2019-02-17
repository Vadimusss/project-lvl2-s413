import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import makeRender from './renderers';
import parseData from './parsers';

const getData = filePath => fs.readFileSync(filePath, 'utf-8');
const getFormat = filePath => path.extname(filePath).slice(1);

const isObject = elm => typeof elm === 'object';

const genDiff = (first, second, format) => {
  const firstObject = parseData(getData(first), getFormat(first));
  const secondObject = parseData(getData(second), getFormat(second));

  const iter = (fst, scd) => {
    const unionKeys = _.union(Object.keys(fst), Object.keys(scd));

    return unionKeys.reduce((acc, key) => {
      if (!_.has(scd, key)) {
        return acc.concat([['settingDeleted', key, fst[key]]]);
      }

      if (!_.has(fst, key)) {
        return acc.concat([['settingAdded', key, scd[key]]]);
      }

      if (isObject(fst[key]) && isObject(scd[key])) {
        return acc.concat([['settingList', key, iter(fst[key], scd[key])]]);
      }

      if (fst[key] !== scd[key]) {
        return acc.concat([['settingModified', key, [fst[key], scd[key]], scd[key]]]);
      }

      return acc.concat([['settingUnmodified', key, fst[key]]]);
    }, []);
  };

  return makeRender[format](['settingList', '', iter(firstObject, secondObject)]);
};

export default genDiff;
