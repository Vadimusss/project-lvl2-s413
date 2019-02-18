import _ from 'lodash';

const settingList = list => list.children
  .reduce((acc, data) => acc.concat([iter(data, list.name)]), []);

const stringify = value => `${((value instanceof Object) ? '[complex value]' : value)}`;

const settingUnmodified = (data, path) => [`Property '${path}.${data.name}' not changed it is equal: ${stringify(data.value)}`];

const settingAdded = (data, path) => [`Property '${path}.${data.name}' was added with value: ${stringify(data.value)}`];

const settingDeleted = (data, path) => [`Property '${path}.${data.name}' was removed`];

const settingModified = (data, path) => [`Property '${path}.${data.name}' was updated. From ${stringify(data.oldValue)} to ${stringify(data.newValue)}`];

const mapping = {
  settingList,
  settingUnmodified,
  settingModified,
  settingAdded,
  settingDeleted,
};

const iter = (data, path) => {
  const result = mapping[data.type](data, path);
  return _.flattenDeep(result).join('\n');
};

const makePlaneRender = ast => iter(ast, '');

export default makePlaneRender;
