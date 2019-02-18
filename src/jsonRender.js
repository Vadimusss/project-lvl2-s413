const settingList = list => list.children
  .reduce((acc, setting) => acc.concat(iter(setting)), []);

const stringify = value => `${((value instanceof Object) ? '[complex value]' : value)}`;

const settingUnmodified = setting => setting;

const settingAdded = setting => setting;

const settingDeleted = setting => setting;

const settingModified = setting => setting;

const mapping = {
  settingList,
  settingUnmodified,
  settingModified,
  settingAdded,
  settingDeleted,
};

const iter = data => mapping[data.type](data);

const makeJSONRender = (data) => {
  const nodeList = iter(data);
  const added = nodeList
    .filter(value => value.type === 'settingAdded')
    .reduce((acc, setting) => {
      const newAcc = Object.assign(acc, { [setting.name]: stringify(setting.value) });
      return newAcc;
    }, {});

  const deleted = nodeList
    .filter(value => value.type === 'settingDeleted')
    .reduce((acc, setting) => {
      const newAcc = Object.assign(acc, { [setting.name]: stringify(setting.value) });
      return newAcc;
    }, {});

  const modified = nodeList
    .filter(value => value.type === 'settingModified')
    .reduce((acc, setting) => {
      const newAcc = Object.assign(acc, { [setting.name]: stringify(setting.newValue) });
      return newAcc;
    }, {});

  const unmodified = nodeList
    .filter(value => value.type === 'settingUnmodified')
    .reduce((acc, setting) => {
      const newAcc = Object.assign(acc, { [setting.name]: stringify(setting.value) });
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
