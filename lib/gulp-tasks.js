'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gulpTasksLinters = require('./gulp-tasks-linters');

var _gulpTasksLinters2 = _interopRequireDefault(_gulpTasksLinters);

var _gulpTasksPack = require('./gulp-tasks-pack');

var _gulpTasksPack2 = _interopRequireDefault(_gulpTasksPack);

var _gulpTasksTest = require('./gulp-tasks-test');

var _gulpTasksTest2 = _interopRequireDefault(_gulpTasksTest);

var _gulpTasksDist = require('./gulp-tasks-dist');

var _gulpTasksDist2 = _interopRequireDefault(_gulpTasksDist);

var _gulpTasksDev = require('./gulp-tasks-dev');

var _gulpTasksDev2 = _interopRequireDefault(_gulpTasksDev);

var _gulpTasksSync = require('./gulp-tasks-sync');

var _gulpTasksSync2 = _interopRequireDefault(_gulpTasksSync);

var _gulpTasksCore = require('./gulp-tasks-core');

var _gulpTasksCore2 = _interopRequireDefault(_gulpTasksCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(gulp, options) {

  (0, _gulpTasksCore2.default)(gulp, options);
  (0, _gulpTasksPack2.default)(gulp, options);
  (0, _gulpTasksLinters2.default)(gulp, options);
  (0, _gulpTasksTest2.default)(gulp, options);
  (0, _gulpTasksDist2.default)(gulp, options);
  (0, _gulpTasksDev2.default)(gulp, options);
  (0, _gulpTasksSync2.default)(gulp, options);
};

exports.default = _default;
;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/gulp-tasks.js');
}();

;