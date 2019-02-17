const settingList = (list, deep) => {
  const { name, children } = list;

  if (deep > 0) {
    return `${'    '.repeat(deep)}${name}: {\n${children
      .reduce((acc, setting) => `${acc}${iter(setting, deep + 1)}\n`, '')}${'    '.repeat(deep)}}`;
  }

  return `{\n${children
    .reduce((acc, setting) => `${acc}${iter(setting, deep + 1)}\n`, '')}}`;
};

const stringify = (value, deep) => ((value instanceof Object) ? `{\n${Object.entries(value)
  .reduce((acc, setting) => `${acc}${iter({
    type: 'settingUnmodified', name: setting[0], value: setting[1],
  }, deep + 1)}\n`, '')}${'    '.repeat((deep < 2) ? deep : 2)}}` : value);

const settingUnmodified = (setting, deep) => `${'    '
  .repeat(deep - 1)}    ${setting.name}: ${stringify(setting.value, deep)}`;

const settingAdded = (setting, deep) => `${'    '
  .repeat(deep - 1)}  + ${setting.name}: ${stringify(setting.value, deep)}`;

const settingDeleted = (setting, deep) => `${'    '
  .repeat(deep - 1)}  - ${setting.name}: ${stringify(setting.value, deep)}`;

const settingModified = (setting, deep) => `${'    '
  .repeat(deep - 1)}  - ${setting.name}: ${stringify(setting.oldValue, deep)}\n${'    '
  .repeat(deep - 1)}  + ${setting.name}: ${stringify(setting.newValue, deep)}`;

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
