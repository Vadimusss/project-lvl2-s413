import fs from 'fs';
import gendiff from '../src';
import makeRender from '../src/renderers';

test.each([['json'], ['yml'], ['ini']])(
  'test gendiff with %s deepFile',
  (ext) => {
    const firstPath = `./__tests__/__fixtures__/beforeDeep.${ext}`;
    const secondPath = `./__tests__/__fixtures__/afterDeep.${ext}`;
    const checkString = fs.readFileSync('./__tests__/__fixtures__/resultDeep', 'utf-8');
    const defaultString = makeRender.default(gendiff(firstPath, secondPath));

    expect(defaultString).toBe(checkString);
  },
);

test.each([['json'], ['yml'], ['ini']])(
  'test gendiff with %s deepFile',
  (ext) => {
    const firstPath = `./__tests__/__fixtures__/beforeDeep.${ext}`;
    const secondPath = `./__tests__/__fixtures__/afterDeep.${ext}`;
    const checkString = fs.readFileSync('./__tests__/__fixtures__/resultDeepPlane', 'utf-8');
    const planeString = makeRender.plane(gendiff(firstPath, secondPath));

    expect(planeString).toBe(checkString);
  },
);

test.each([['json'], ['yml'], ['ini']])(
  'test gendiff with %s deepFile',
  (ext) => {
    const firstPath = `./__tests__/__fixtures__/beforeDeep.${ext}`;
    const secondPath = `./__tests__/__fixtures__/afterDeep.${ext}`;
    const checkString = fs.readFileSync('./__tests__/__fixtures__/resultDeepJSON.json', 'utf-8');
    const jsonString = makeRender.json(gendiff(firstPath, secondPath));

    expect(jsonString).toBe(checkString);
  },
);
