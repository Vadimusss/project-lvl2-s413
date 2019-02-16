import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import rending from './render';
import parseData from './parsers';

const getData = filePath => fs.readFileSync(filePath, 'utf-8');
const getFormat = filePath => path.extname(filePath).slice(1);

const isObject = elm => typeof elm === 'object';

const genDiff = (first, second) => {
  const firstObject = parseData(getData(first), getFormat(first));
  const secondObject = parseData(getData(second), getFormat(second));

  const iter = (fst, scd, nesting) => {
    const unionKeys = _.union(Object.keys(fst), Object.keys(scd));
    return unionKeys.reduce((acc, key) => {
      if (!_.has(scd, key)) {
        acc.push({
          type: 'del',
          nesting: (nesting === 2) ? nesting - 1 : nesting,
          body: [key, fst[key]],
        });
        return acc;
      }

      if (!_.has(fst, key)) {
        acc.push({
          type: 'add',
          nesting: (nesting > 2) ? nesting : nesting - 1,
          body: [key, scd[key]],
        });
        return acc;
      }


      if (isObject(fst[key]) && isObject(scd[key])) {
        acc.push({
          type: 'change',
          nesting: (nesting > 2) ? nesting + 1 : nesting,
          body: [key, iter(fst[key], scd[key], nesting + 1)],
        });

        return acc;
      }

      if (fst[key] !== scd[key]) {
        acc.push({
          type: 'del',
          nesting,
          body: [key, fst[key]],
        });
        acc.push({
          type: 'add',
          nesting,
          body: [key, scd[key]],
        });
        return acc;
      }

      console.log(nesting);
      console.log(key);
      acc.push({
        type: 'some',
        nesting: (nesting > 3) ? nesting + 1 : nesting,
        body: [key, scd[key]],
      });
      return acc;
    }, []);
  };

  const root = {
    type: 'root',
    body: iter(firstObject, secondObject, 2),
  };

  return rending(root);
};

export default genDiff;
