import path from 'path';
import fs from 'fs';
import deepAssign from 'deep-assign';
import yargs from 'yargs';

const argv = yargs
  .option('minify', {
    type: 'boolean',
    default: true
  })
  .option('open', {
    type: 'boolean',
    default: true
  })
  .option('preprocess', {
    type: 'boolean',
    default: true
  })
  .argv;

delete argv._;
delete argv.$0;

const deprecated = (name, warning) => {
  console.warn(`[grommet-toolbox] DEPRECATED: ${name}. ${warning}`);
};

let options;
export function getOptions (opts) {
  if (!options) {
    if (!opts) {
      const configPath = path.resolve(process.cwd(), 'grommet-toolbox.config.js');
      try {
        fs.accessSync(configPath, fs.F_OK);
      } catch (e) {
        opts = {};
      }

      if (!opts) {
        const config = require(configPath);
        opts = config.default || config;
      }
    }

    options = opts || {};

    options.lintCache = opts.lintCache !== undefined ? opts.lintCache : true;

    if (options.scsslint || options.scsslint === false) {
      console.warn('[grommet-toolbox] scsslint option has been deprecated and will be removed in the next major release. SCSS linting is always enabled now.');
    }

    options.scsslint = options.scsslint === undefined ? true : options.scsslint;

    options.dist = options.dist || path.resolve(process.cwd(), 'dist');

    const jsLoader = options.jsLoader || {
      test: /\.jsx?|.react$/,
      loader: 'babel',
      exclude: /(node_modules|bower_components|src\/lib)/
    };

    const scssLoader = options.scssLoader || {
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, 
      {
        loader: "css-loader"
      },
      {
        loader: "sass-loader",
        options: {
          includePaths: [(encodeURIComponent(
            path.resolve(options.base || process.cwd(), './node_modules')
          )), (encodeURIComponent(
            path.resolve(options.base || process.cwd(),
            './node_modules/grommet/node_modules'))
          )]
        }
      }]
    };

    options.webpack = deepAssign({
      entry:{
        app:  options.webpack && options.webpack.entry ? options.webpack.entry : path.resolve(options.mainJs)
      },
      output: {
        filename: 'index.js'
      },
      resolve: {
        modules: [
          path.resolve(process.cwd(), 'node_modules')
        ]
      },
      module: {
        rules: []
      },
      resolveLoader: {}
    }, options.webpack);

    options.webpack.module.rules = options.webpack.module.rules.concat(
      jsLoader,
      scssLoader,
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.png$/,
        loader: 'file-loader?mimetype=image/png'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader?mimetype=image/jpg'
      },
      {
        test: /\.woff$/,
        loader: 'file-loader?mimetype=application/font-woff'
      },
      {
        test: /\.otf$/,
        loader: 'file-loader?mimetype=application/font/opentype'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      }
    );

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

    options.argv = deepAssign({}, options.argv, argv);
  }

  return options;
};

export default getOptions;
