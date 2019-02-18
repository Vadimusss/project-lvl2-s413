const settingList = (list, deep) => {
  const { name, children } = list;

  if (deep > 0) {
    return `${'    '.repeat(deep)}${name}: {\n${children
      .reduce((acc, data) => `${acc}${iter(data, deep + 1)}\n`, '')}${'    '.repeat(deep)}}`;
  }

  return `{\n${children
    .reduce((acc, data) => `${acc}${iter(data, deep + 1)}\n`, '')}}`;
};

const stringify = (value, deep) => ((value instanceof Object) ? `{\n${Object.entries(value)
  .reduce((acc, data) => `${acc}${iter({
    type: 'settingUnmodified', name: data[0], value: data[1],
  }, deep + 1)}\n`, '')}${'    '.repeat((deep < 2) ? deep : 2)}}` : value);

const settingUnmodified = (data, deep) => `${'    '
  .repeat(deep - 1)}    ${data.name}: ${stringify(data.value, deep)}`;

const settingAdded = (data, deep) => `${'    '
  .repeat(deep - 1)}  + ${data.name}: ${stringify(data.value, deep)}`;

const settingDeleted = (data, deep) => `${'    '
  .repeat(deep - 1)}  - ${data.name}: ${stringify(data.value, deep)}`;

const settingModified = (data, deep) => `${'    '
  .repeat(deep - 1)}  - ${data.name}: ${stringify(data.oldValue, deep)}\n${'    '
  .repeat(deep - 1)}  + ${data.name}: ${stringify(data.newValue, deep)}`;

const mapping = {
  settingList,
  settingUnmodified,
  settingModified,
  settingAdded,
  settingDeleted,
};

const iter = (data, deep) => `${mapping[data.type](data, deep)}`;

const treeRender = ast => iter(ast, 0);

export default treeRender;
