const babelConfig = require('../.babelrc');
require("@babel/register")({
  ...babelConfig
});

require("./server");