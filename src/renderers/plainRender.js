import _ from 'lodash';

const dataList = list => _.flatten(list.children
  .reduce((acc, data) => [...acc, iter(data, list.name)], []));

const stringify = value => `${((value instanceof Object) ? '[complex value]' : value)}`;

const unmodified = (data, path) => `Property '${path}.${data.name}' not changed it is equal: ${stringify(data.value)}`;

const added = (data, path) => `Property '${path}.${data.name}' was added with value: ${stringify(data.value)}`;

const deleted = (data, path) => `Property '${path}.${data.name}' was removed`;

const modified = (data, path) => `Property '${path}.${data.name}' was updated. From ${stringify(data.oldValue)} to ${stringify(data.newValue)}`;

const mapping = {
  dataList,
  unmodified,
  modified,
  added,
  deleted,
};

const iter = (data, path) => mapping[data.type](data, path);

const makePlainRender = ast => (iter(ast, '')).join('\n');

export default makePlainRender;
