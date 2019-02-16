import _ from 'lodash';

const stringify = (value, nesting) => {
  return (value instanceof Object) ? Object.keys(value)
    .reduce((acc, key) => `{${acc}\n${'  '.repeat(nesting + 3)}${key}: ${value[key]}\n${'  '.repeat(nesting + 1)}}`, '') : value;
};

const iter = (data) => {
  const newAcc = mapping[data.type](data);
  return `${newAcc}\n`;
};

const change = (data) => {
  const { body, nesting } = data;
  return `${'  '.repeat(nesting)}${body[0]}: {\n${body[1]
    .reduce((acc, setting) => `${acc}${iter(setting)}`, '')}${'  '.repeat(nesting)}}`;
};

const add = (data) => {
  const { body, nesting } = data;
  return `${'  '.repeat(nesting)}+ ${body[0]}: ${stringify(body[1], nesting)}`;
};

const del = (data) => {
  const { body, nesting } = data;
  return `${'  '.repeat(nesting)}- ${body[0]}: ${stringify(body[1], nesting)}`;
};

const some = (data) => {
  const { body, nesting } = data;
  console.log(nesting);
  console.log(body);
  return `${'  '.repeat(nesting)}  ${body[0]}: ${stringify(body[1], nesting)}`;
};

const root = (data) => {
  const { body } = data;

  return `{\n${body.reduce((acc, setting) => `${acc}${iter(setting)}`, '')}}`;
};

const mapping = {
  root,
  change,
  add,
  del,
  some,
};

const rending = ast => iter(ast);

export default rending;
