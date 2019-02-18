import _ from 'lodash';

const settingList = (list, deep) => {
  const { name, children } = list;

  if (deep > 0) {
    return [[`${'    '.repeat(deep)}${name}: {`],
      [children.reduce((acc, data) => acc.concat(treeRender(data, deep + 1)), [])],
      [`${'    '.repeat(deep)}}`]];
  }

  return [['{'], [children.reduce((acc, data) => acc.concat(treeRender(data, deep + 1)), [])], ['}']];
};

const stringify = (value, deep) => {
  if (!_.isObject(value)) {
    return value;
  }
  const formatedValue = Object.entries(value).reduce((acc, data) => acc.concat([`${data[0]}: ${data[1]}`]), []);
  return `{\n${'    '.repeat(deep + 1)}${formatedValue}\n${'    '.repeat((deep < 2) ? deep : 2)}}`;
};

const settingUnmodified = (data, deep) => [`${'    '
  .repeat(deep - 1)}    ${data.name}: ${stringify(data.value, deep)}`];

const settingAdded = (data, deep) => [`${'    '
  .repeat(deep - 1)}  + ${data.name}: ${stringify(data.value, deep)}`];

const settingDeleted = (data, deep) => [`${'    '
  .repeat(deep - 1)}  - ${data.name}: ${stringify(data.value, deep)}`];

const settingModified = (data, deep) => [[`${'    '.repeat(deep - 1)}  - ${data.name}: ${stringify(data.oldValue, deep)}`],
  [`${'    '.repeat(deep - 1)}  + ${data.name}: ${stringify(data.newValue, deep)}`]];

const mapping = {
  settingList,
  settingUnmodified,
  settingModified,
  settingAdded,
  settingDeleted,
};

const treeRender = (ast, deep = 0) => {
  const result = mapping[ast.type](ast, deep);

  return _.flattenDeep(result).join('\n');
};

export default treeRender;
