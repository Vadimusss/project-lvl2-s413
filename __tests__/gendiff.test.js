/* eslint-disable no-undef */
import fs from 'file-system';
import gendiff from '../src/gendiff';

test('test gendiff with JSON', () => {
  const firstPath = './__tests__/__fixtures__/before.json';
  const secondPath = './__tests__/__fixtures__/after.json';
  const checkString = fs.readFileSync('./__tests__/__fixtures__/result', 'utf-8');

  expect(gendiff(firstPath, secondPath)).toBe(checkString);
});

test('test gendiff with YML', () => {
  const firstPath = './__tests__/__fixtures__/before.yml';
  const secondPath = './__tests__/__fixtures__/after.yml';
  const checkString = fs.readFileSync('./__tests__/__fixtures__/result', 'utf-8');

  expect(gendiff(firstPath, secondPath)).toBe(checkString);
});
