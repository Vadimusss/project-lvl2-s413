import _ from 'lodash';

const settingList = (list, deep) => {
  const { name, children } = list;

  if (deep > 0) {
    return [[`${'    '.repeat(deep)}${name}: {`],
      [children.reduce((acc, data) => acc.concat(iter(data, deep + 1)), [])],
      [`${'    '.repeat(deep)}}`]];
  }

  return [['{'], [children.reduce((acc, data) => acc.concat(iter(data, deep + 1)), [])], ['}']];
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

const iter = (data, deep) => {
  const result = mapping[data.type](data, deep);
  return _.flattenDeep(result).join('\n');
};

const treeRender = ast => iter(ast, 0);

export default treeRender;
