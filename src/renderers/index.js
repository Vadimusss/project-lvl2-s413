import makeTreeRender from './treeRender';
import makePlainRender from './plainRender';
import makeJSONRender from './jsonRender';

const makeRender = {
  default: makeTreeRender,
  plain: makePlainRender,
  json: makeJSONRender,
};

export default makeRender;
