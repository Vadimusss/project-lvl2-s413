/* eslint-disable no-undef */
import fs from 'file-system';
import gendiff from '../src';

test.each([['json'], ['yml'], ['ini']])(
  'test gendiff with %s file',
  (ext) => {
    const firstPath = `./__tests__/__fixtures__/before.${ext}`;
    const secondPath = `./__tests__/__fixtures__/after.${ext}`;
    const checkString = fs.readFileSync('./__tests__/__fixtures__/result', 'utf-8');

    expect(gendiff(firstPath, secondPath)).toBe(checkString);
  },
);
