import makeTreeRender from './renderers/treeRender';
import makePlainRender from './renderers/planeRender';
import makeJSONRender from './renderers/jsonRender';

const makeRender = {
  default: makeTreeRender,
  plane: makePlainRender,
  json: makeJSONRender,
};

export default makeRender;
