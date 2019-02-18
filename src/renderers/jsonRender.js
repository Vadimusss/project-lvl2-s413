const dataList = list => list.children
  .reduce((acc, data) => acc.concat(iter(data)), []);

const stringify = value => `${((value instanceof Object) ? '[complex value]' : value)}`;

const unmodified = data => data;

const added = data => data;

const deleted = data => data;

const modified = data => data;

const mapping = {
  dataList,
  unmodified,
  modified,
  added,
  deleted,
};

const iter = data => mapping[data.type](data);

const makeJSONRender = (ast) => {
  const nodeList = iter(ast);
  const addedList = nodeList
    .filter(value => value.type === 'added')
    .reduce((acc, data) => {
      const newAcc = Object.assign(acc, { [data.name]: stringify(data.value) });
      return newAcc;
    }, {});

  const deletedList = nodeList
    .filter(value => value.type === 'deleted')
    .reduce((acc, data) => {
      const newAcc = Object.assign(acc, { [data.name]: stringify(data.value) });
      return newAcc;
    }, {});

  const modifiedList = nodeList
    .filter(value => value.type === 'modified')
    .reduce((acc, data) => {
      const newAcc = Object.assign(acc, { [data.name]: stringify(data.newValue) });
      return newAcc;
    }, {});

  const unmodifiedList = nodeList
    .filter(value => value.type === 'unmodified')
    .reduce((acc, data) => {
      const newAcc = Object.assign(acc, { [data.name]: stringify(data.value) });
      return newAcc;
    }, {});

  const resultJSON = {
    added: addedList,
    deleted: deletedList,
    modified: modifiedList,
    unmodified: unmodifiedList,
  };

  return JSON.stringify(resultJSON);
};

export default makeJSONRender;
