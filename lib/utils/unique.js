"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _default = function _default(arr1, arr2) {
  var result = (arr1 || []).concat(arr2);

  return result.filter(function (elem, index) {
    return result.indexOf(elem) === index;
  });
};

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, "default", "src/utils/unique.js");
}();

;