'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOptions = getOptions;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _deepAssign = require('deep-assign');

var _deepAssign2 = _interopRequireDefault(_deepAssign);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = _yargs2.default.option('minify', {
  type: 'boolean',
  default: true
}).option('open', {
  type: 'boolean',
  default: true
}).option('preprocess', {
  type: 'boolean',
  default: true
}).argv;

delete argv._;
delete argv.$0;

var deprecated = function deprecated(name, warning) {
  console.warn('[grommet-toolbox] DEPRECATED: ' + name + '. ' + warning);
};

var options = void 0;
function getOptions(opts) {
  if (!options) {
    if (!opts) {
      var configPath = _path2.default.resolve(process.cwd(), 'grommet-toolbox.config.js');
      try {
        _fs2.default.accessSync(configPath, _fs2.default.F_OK);
      } catch (e) {
        opts = {};
      }

      if (!opts) {
        var config = require(configPath);
        opts = config.default || config;
      }
    }

    options = opts || {};

    options.lintCache = opts.lintCache !== undefined ? opts.lintCache : true;

    if (options.scsslint || options.scsslint === false) {
      console.warn('[grommet-toolbox] scsslint option has been deprecated and will be removed in the next major release. SCSS linting is always enabled now.');
    }

    options.scsslint = options.scsslint === undefined ? true : options.scsslint;

    options.dist = options.dist || _path2.default.resolve(process.cwd(), 'dist');

    var jsLoader = options.jsLoader || {
      test: /\.jsx?|.react$/,
      loader: 'babel',
      exclude: /(node_modules|bower_components|src\/lib)/
    };

    var scssLoader = options.scssLoader || {
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader",
        options: {
          includePaths: [encodeURIComponent(_path2.default.resolve(options.base || process.cwd(), './node_modules')), encodeURIComponent(_path2.default.resolve(options.base || process.cwd(), './node_modules/grommet/node_modules'))]
        }
      }]
    };

    options.webpack = (0, _deepAssign2.default)({
      entry: {
        app: options.webpack && options.webpack.entry ? options.webpack.entry : _path2.default.resolve(options.mainJs)
      },
      output: {
        filename: 'index.js'
      },
      resolve: {
        modules: [_path2.default.resolve(process.cwd(), 'node_modules')]
      },
      module: {
        rules: []
      },
      resolveLoader: {}
    }, options.webpack);

    options.webpack.module.rules = options.webpack.module.rules.concat(jsLoader, scssLoader, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.png$/,
      loader: 'file-loader?mimetype=image/png'
    }, {
      test: /\.jpg$/,
      loader: 'file-loader?mimetype=image/jpg'
    }, {
      test: /\.woff$/,
      loader: 'file-loader?mimetype=application/font-woff'
    }, {
      test: /\.otf$/,
      loader: 'file-loader?mimetype=application/font/opentype'
    }, {
      test: /\.css$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",
        options: {
          modules: true
        }
      }]
    });

    // Argv Deprecation warnings
    if (argv.skipPreprocess) {
      deprecated('skipPreprocess', 'Use --no-preprocess instead.');
      argv.preprocess = false;
    }

    if (argv.skipOpen) {
      deprecated('skipOpen', 'Use --no-open instead.');
      argv.open = false;
    }

    if (argv.skipMinify) {
      deprecated('skipMinify', 'Use --no-minify instead.');
      argv.minify = false;
    }

    options.argv = (0, _deepAssign2.default)({}, options.argv, argv);
  }

  return options;
};

var _default = getOptions;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(argv, 'argv', 'src/gulp-options-builder.js');

  __REACT_HOT_LOADER__.register(deprecated, 'deprecated', 'src/gulp-options-builder.js');

  __REACT_HOT_LOADER__.register(options, 'options', 'src/gulp-options-builder.js');

  __REACT_HOT_LOADER__.register(getOptions, 'getOptions', 'src/gulp-options-builder.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/gulp-options-builder.js');
}();

;