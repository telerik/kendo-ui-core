exports.jsdoctoolkit = {
  run: function(args) {
    global.internal_args = args || [];
    require('./run');
  }
};