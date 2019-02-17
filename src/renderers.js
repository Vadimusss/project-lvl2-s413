import makeTreeRender from './treeRender';
import makePlainRender from './planeRender';

const makeRender = {
  default: makeTreeRender,
  plane: makePlainRender,
};

export default makeRender;
