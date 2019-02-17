const settingList = list => list.children
  .reduce((acc, setting) => `${acc}${iter(setting, list.name)}`, '');

const stringify = value => `${((value instanceof Object) ? '[complex value]' : value)}`;

const settingUnmodified = (setting, path) => `Property '${path}.${setting.name}' not changed it is equal: ${stringify(setting.value)}\n`;

const settingAdded = (setting, path) => `Property '${path}.${setting.name}' was added with value: ${stringify(setting.value)}\n`;

const settingDeleted = (setting, path) => `Property '${path}.${setting.name}' was removed\n`;

const settingModified = (setting, path) => `Property '${path}.${setting.name}' was updated. From ${stringify(setting.oldValue)} to ${stringify(setting.newValue)}\n`;

const mapping = {
  settingList,
  settingUnmodified,
  settingModified,
  settingAdded,
  settingDeleted,
};

const iter = (data, path) => `${mapping[data.type](data, path)}`;

const makePlaneRender = ast => iter(ast, '').slice(0, -1);

export default makePlaneRender;
