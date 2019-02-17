const settingList = list => list[2]
  .reduce((acc, setting) => `${acc}${iter(setting, list[1])}`, '');

const stringify = value => `${((value instanceof Object) ? '[complex value]' : value)}`;

const settingUnmodified = (setting, path) => `Property '${path}.${setting[1]}' not changed it is equal: ${stringify(setting[2])}\n`;

const settingAdded = (setting, path) => `Property '${path}.${setting[1]}' was added with value: ${stringify(setting[2])}\n`;

const settingDeleted = (setting, path) => `Property '${path}.${setting[1]}' was removed\n`;

const settingModified = (setting, path) => `Property '${path}.${setting[1]}' was updated. From ${stringify(setting[2][0])} to ${stringify(setting[2][1])}\n`;

const mapping = {
  settingList,
  settingUnmodified,
  settingModified,
  settingAdded,
  settingDeleted,
};

const iter = (data, path) => `${mapping[data[0]](data, path)}`;

const makePlaneRender = ast => iter(ast, '').slice(0, -1);

export default makePlaneRender;
