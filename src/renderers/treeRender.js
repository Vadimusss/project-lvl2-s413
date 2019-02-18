import _ from 'lodash';

const dataList = (list, depth) => {
  const { name, children } = list;

  if (depth > 0) {
    return [`${'    '.repeat(depth)}${name}: {`,
      children.reduce((acc, data) => [...acc, dispatcher(data, depth + 1)], []),
      `${'    '.repeat(depth)}}`];
  }

  return ['{', children.reduce((acc, data) => [...acc, dispatcher(data, depth + 1)], []), '}'];
};

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const formatedValue = Object.entries(value).reduce((acc, data) => [...acc, `${data[0]}: ${data[1]}`], []);
  return `{\n${'    '.repeat(depth + 1)}${formatedValue.join('\n')}\n${'    '.repeat((depth < 2) ? depth : 2)}}`;
};

const unmodified = (data, depth) => `${'    '
  .repeat(depth - 1)}    ${data.name}: ${stringify(data.value, depth)}`;

const added = (data, depth) => `${'    '
  .repeat(depth - 1)}  + ${data.name}: ${stringify(data.value, depth)}`;

const deleted = (data, depth) => `${'    '
  .repeat(depth - 1)}  - ${data.name}: ${stringify(data.value, depth)}`;

const modified = (data, depth) => `${'    '
  .repeat(depth - 1)}  - ${data.name}: ${stringify(data.oldValue, depth)}\n${'    '
  .repeat(depth - 1)}  + ${data.name}: ${stringify(data.newValue, depth)}`;

const mapping = {
  dataList,
  unmodified,
  modified,
  added,
  deleted,
};
/* Без дополнительной функции не получается собрать */
const dispatcher = (ast, depth) => mapping[ast.type](ast, depth);

const treeRender = ast => _.flattenDeep(dispatcher(ast, 0)).join('\n');

export default treeRender;
