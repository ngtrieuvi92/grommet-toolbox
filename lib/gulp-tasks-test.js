'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.testTasks = testTasks;

var _gulpEnv = require('gulp-env');

var _gulpEnv2 = _interopRequireDefault(_gulpEnv);

var _gulpJest = require('gulp-jest');

var _gulpJest2 = _interopRequireDefault(_gulpJest);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _gulpOptionsBuilder = require('./gulp-options-builder');

var _gulpOptionsBuilder2 = _interopRequireDefault(_gulpOptionsBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function testTasks(gulp, opts) {

  var envs = _gulpEnv2.default.set({
    NODE_ENV: 'test'
  });

  var runSequence = require('run-sequence').use(gulp);

  var options = (0, _gulpOptionsBuilder2.default)(opts);

  var watch = void 0;

  gulp.task('test', function () {
    if (watch) {
      process.env.NODE_ENV = 'test';
    }
    if (options.testPaths) {
      return gulp.src(options.testPaths).pipe((0, _gulpIf2.default)(!watch, envs)).pipe((0, _gulpJest2.default)(_extends({
        modulePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/templates/"],
        testPathIgnorePatterns: options.testPaths.filter(function (path) {
          return path.startsWith('!');
        }).map(function (path) {
          return path.substring(1);
        }),
        rootDir: options.base || process.cwd(),
        verbose: true
      }, options.argv))).on('error', function (error) {
        _gulpUtil2.default.log(error.message);
        if (!watch) {
          process.exit(1);
        }
      }).pipe((0, _gulpIf2.default)(!watch, envs.reset));
    }
  });

  gulp.task('test:update', function () {
    if (options.testPaths) {
      return gulp.src(options.testPaths).pipe((0, _gulpIf2.default)(!watch, envs)).pipe((0, _gulpJest2.default)(_extends({
        modulePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/templates/"],
        testPathIgnorePatterns: options.testPaths.filter(function (path) {
          return path.startsWith('!');
        }).map(function (path) {
          return path.substring(1);
        }),
        rootDir: options.base || process.cwd(),
        updateSnapshot: true
      }, options.argv))).on('error', function (error) {
        _gulpUtil2.default.log(error.message);
        process.exit(1);
      }).pipe((0, _gulpIf2.default)(!watch, envs.reset));
    }
  });

  gulp.task('test:watcher', function () {
    return gulp.watch([].concat(_toConsumableArray(options.testPaths), _toConsumableArray(options.jsAssets)), ['test']);
  });

  gulp.task('test:watch', function () {
    watch = true;
    runSequence('test', 'test:watcher');
  });

  gulp.task('test:coverage', function () {
    if (options.testPaths) {
      return gulp.src(options.testPaths).pipe(envs).pipe((0, _gulpJest2.default)(_extends({
        collectCoverageFrom: options.jsAssets,
        collectCoverage: true,
        coverageReporters: ['lcov'],
        modulePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/templates/"],
        testPathIgnorePatterns: options.testPaths.filter(function (path) {
          return path.startsWith('!');
        }).map(function (path) {
          return path.substring(1);
        }),
        rootDir: options.base || process.cwd()
      }, options.argv))).on('error', function (error) {
        _gulpUtil2.default.log(error.message);
        process.exit(1);
      }).pipe(envs.reset).on('finish', function () {
        console.log('Test coverage report available at coverage/lcov-report/index.html');
      });
    }
  });
};

var _default = testTasks;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(testTasks, 'testTasks', 'src/gulp-tasks-test.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/gulp-tasks-test.js');
}();

;