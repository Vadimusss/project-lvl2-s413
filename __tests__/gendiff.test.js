/* eslint-disable no-undef */
import fs from 'file-system';
import gendiff from '../src/bin/gendiff';

const firstPath = './__tests__/__fixtures__/before.json';
const secondPath = './__tests__/__fixtures__/after.json';
const absoluteFirstPath = '/home/vadim/Desktop/gendiff/__tests__/__fixtures__/before.json';
const absoluteSecondPath = '/home/vadim/Desktop/gendiff/__tests__/__fixtures__/after.json';
const checkString = fs.readFileSync('./__tests__/__fixtures__/result', 'utf-8');

test('test gendiff', () => {
  expect(gendiff(firstPath, secondPath)).toBe(checkString);
});

test('test gendiff with absolute paths', () => {
  expect(gendiff(absoluteFirstPath, absoluteSecondPath)).toBe(checkString);
});
