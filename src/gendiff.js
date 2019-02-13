import has from 'lodash/has';
import parser from './parsers';

export default (firstFile, secondFile) => {
  const firstObject = parser(firstFile);
  const secondObject = parser(secondFile);

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
