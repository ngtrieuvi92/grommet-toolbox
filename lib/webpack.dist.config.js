'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _deepAssign = require('deep-assign');

var _deepAssign2 = _interopRequireDefault(_deepAssign);

var _unique = require('./utils/unique');

var _unique2 = _interopRequireDefault(_unique);

var _gulpOptionsBuilder = require('./gulp-options-builder');

var _gulpOptionsBuilder2 = _interopRequireDefault(_gulpOptionsBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-register');

var options = (0, _gulpOptionsBuilder2.default)();

var env = (0, _deepAssign2.default)({
  __DEV_MODE__: false,
  NODE_ENV: '"production"',
  'process.env.NODE_ENV': '"production"'
}, options.env);

var config = _extends({}, options.webpack);

config.plugins = [new _webpack2.default.DefinePlugin(env), new _webpack2.default.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
}), new _webpack2.default.optimize.DedupePlugin(), new _webpack2.default.optimize.OccurenceOrderPlugin()
// new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
];

// if (options.argv.minify) {
//   config.plugins.push(new webpack.optimize.UglifyJsPlugin({
//     compress: {
//       warnings: false
//     }
//   }));
// }

if (options.webpack.plugins) {
  options.webpack.plugins.forEach(function (plugin) {
    return config.plugins.push(plugin);
  });
}

config.resolve.extensions = (0, _unique2.default)(config.resolve.extensions, ['', '.react', '.jsx', '.js', '.json', '.htm', '.html', '.scss', '.md', '.svg']);

config.resolve.modulesDirectories = (0, _unique2.default)(config.resolve.modulesDirectories, ['node_modules/grommet/node_modules', 'node_modules']);

config.resolveLoader.modulesDirectories = (0, _unique2.default)(config.resolveLoader.modulesDirectories, ['node_modules/grommet/node_modules', 'node_modules']);

var _default = config;
exports.default = _default;

module.exports = config;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(options, 'options', 'src/webpack.dist.config.js');

  __REACT_HOT_LOADER__.register(env, 'env', 'src/webpack.dist.config.js');

  __REACT_HOT_LOADER__.register(config, 'config', 'src/webpack.dist.config.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/webpack.dist.config.js');
}();

;