const settingList = list => list.children
  .reduce((acc, data) => acc.concat(iter(data)), []);

const stringify = value => `${((value instanceof Object) ? '[complex value]' : value)}`;

const settingUnmodified = data => data;

const settingAdded = data => data;

const settingDeleted = data => data;

const settingModified = data => data;

const mapping = {
  settingList,
  settingUnmodified,
  settingModified,
  settingAdded,
  settingDeleted,
};

const iter = data => mapping[data.type](data);

const makeJSONRender = (ast) => {
  const nodeList = iter(ast);
  const added = nodeList
    .filter(value => value.type === 'settingAdded')
    .reduce((acc, data) => {
      const newAcc = Object.assign(acc, { [data.name]: stringify(data.value) });
      return newAcc;
    }, {});

  const deleted = nodeList
    .filter(value => value.type === 'settingDeleted')
    .reduce((acc, data) => {
      const newAcc = Object.assign(acc, { [data.name]: stringify(data.value) });
      return newAcc;
    }, {});

  const modified = nodeList
    .filter(value => value.type === 'settingModified')
    .reduce((acc, data) => {
      const newAcc = Object.assign(acc, { [data.name]: stringify(data.newValue) });
      return newAcc;
    }, {});

  const unmodified = nodeList
    .filter(value => value.type === 'settingUnmodified')
    .reduce((acc, data) => {
      const newAcc = Object.assign(acc, { [data.name]: stringify(data.value) });
      return newAcc;
    }, {});

  const resultJSON = {
    added,
    deleted,
    modified,
    unmodified,
  };

  return JSON.stringify(resultJSON);
};

export default makeJSONRender;
