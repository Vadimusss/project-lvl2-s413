import fs from 'fs';
import gendiff from '../src';

test.each([['json'], ['yml'], ['ini']])(
  'test gendiff with %s deepFile',
  (ext) => {
    const firstPath = `./__tests__/__fixtures__/beforeDeep.${ext}`;
    const secondPath = `./__tests__/__fixtures__/afterDeep.${ext}`;
    const checkString = fs.readFileSync('./__tests__/__fixtures__/resultDeep', 'utf-8');

    expect(gendiff(firstPath, secondPath, 'default')).toBe(checkString);
  },
);

test.each([['json'], ['yml'], ['ini']])(
  'test gendiff with %s deepFile',
  (ext) => {
    const firstPath = `./__tests__/__fixtures__/beforeDeep.${ext}`;
    const secondPath = `./__tests__/__fixtures__/afterDeep.${ext}`;
    const checkString = fs.readFileSync('./__tests__/__fixtures__/resultDeepPlane', 'utf-8');

    expect(gendiff(firstPath, secondPath, 'plane')).toBe(checkString);
  },
);
