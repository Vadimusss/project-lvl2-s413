import makeTreeRender from './treeRender';
import makePlainRender from './planeRender';
import makeJSONRender from './jsonRender';

const makeRender = {
  default: makeTreeRender,
  plane: makePlainRender,
  json: makeJSONRender,
};

export default makeRender;
