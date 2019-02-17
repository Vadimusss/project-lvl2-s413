const settingList = (list, deep) => {
  if (deep > 0) {
    return `${'    '.repeat(deep)}${list[1]}: {\n${list[2]
      .reduce((acc, setting) => `${acc}${iter(setting, deep + 1)}\n`, '')}${'    '.repeat(deep)}}`;
  }

  return `{\n${list[2]
    .reduce((acc, setting) => `${acc}${iter(setting, deep + 1)}\n`, '')}}`;
};

const settingUnmodified = (setting, deep) => `${'    '
  .repeat(deep - 1)}    ${setting[1]}: ${stringify(setting[2], deep)}`;

const settingAdded = (setting, deep) => `${'    '
  .repeat(deep - 1)}  + ${setting[1]}: ${stringify(setting[2], deep)}`;

const settingDeleted = (setting, deep) => `${'    '
  .repeat(deep - 1)}  - ${setting[1]}: ${stringify(setting[2], deep)}`;

const stringify = (value, deep) => ((value instanceof Object) ? `{\n${Object.entries(value)
  .reduce((acc, setting) => `${acc}${iter(['settingUnmodified', setting[0], setting[1]], deep + 1)}\n`, '')}${'    '.repeat((deep < 2) ? deep : 2)}}` : value);

const mapping = {
  settingList,
  settingUnmodified,
  settingAdded,
  settingDeleted,
};

const iter = (data, deep) => `${mapping[data[0]](data, deep)}`;

const makeRender = ast => iter(ast, 0);

export default makeRender;
