import React, { createContext, useState, useEffect, useContext } from 'react';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// eslint-disable-next-line import/no-unresolved
var RouterContext = /*#__PURE__*/createContext({});

/* global google */

var Router = (function (_ref) {
  var children = _ref.children,
      loadScreen = _ref.loadScreen;

  var _useState = useState({
    page: '',
    params: {},
    ready: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      currentPageParams = _useState2[0],
      setCurrentPageParams = _useState2[1];

  useEffect(function () {
    try {
      google.script.url.getLocation(function (location) {
        setCurrentPageParams({
          page: location.hash,
          params: location.parameter,
          ready: true
        });
      });
    } catch (err) {
      console.error(err);
    }
  }, [setCurrentPageParams]);

  var updatePage = function updatePage(page) {
    var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var params = _objectSpread2({}, parameters);

    var now = new Date();
    var state = {
      timestamp: now.getTime()
    };
    google.script.history.push(state, params, page);
    setCurrentPageParams({
      page: page,
      params: params,
      ready: true
    });
  };

  var updateParams = function updateParams() {
    var parameters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var params = _objectSpread2({}, parameters);

    var now = new Date();
    var state = {
      timestamp: now.getTime()
    };
    google.script.history.push(state, params, currentPageParams.page);
    setCurrentPageParams({
      page: currentPageParams.page,
      params: params,
      ready: true
    });
  };

  useEffect(function () {
    try {
      google.script.history.setChangeHandler(function (e) {
        setCurrentPageParams({
          page: e.location.hash,
          params: e.location.parameter,
          ready: true
        });
      });
    } catch (err) {
      console.error(err);
    }
  }, [setCurrentPageParams]);

  if (currentPageParams.ready) {
    return /*#__PURE__*/React.createElement(RouterContext.Provider, {
      value: {
        routeParams: currentPageParams.params,
        page: currentPageParams.page,
        updatePage: updatePage,
        updateParams: updateParams
      }
    }, children);
  }

  return loadScreen || /*#__PURE__*/React.createElement("div", null, "Loading...");
});

// eslint-disable-next-line import/no-unresolved

var Page = function Page(_ref) {
  var children = _ref.children,
      path = _ref.page;

  var _useContext = useContext(RouterContext),
      page = _useContext.page;

  if (page === path || !page && !path) return /*#__PURE__*/React.createElement("div", null, children);
  return null;
};

// eslint-disable-next-line import/no-unresolved

var useRouter = function useRouter() {
  var _useContext = useContext(RouterContext),
      page = _useContext.page,
      routeParams = _useContext.routeParams,
      updateParams = _useContext.updateParams,
      updatePage = _useContext.updatePage;

  return {
    page: page,
    params: routeParams,
    updateParams: updateParams,
    // deprecate
    updatePage: updatePage,
    // deprecate
    setParams: updateParams,
    setPage: updatePage
  };
};

/* eslint-disable jsx-a11y/no-static-element-interactions */

var RouterLink = function RouterLink(_ref) {
  var children = _ref.children,
      page = _ref.page,
      params = _ref.params;

  var _useContext = useContext(RouterContext),
      updatePage = _useContext.updatePage; // eslint-disable-next-line jsx-a11y/click-events-have-key-events


  return /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return updatePage(page, params);
    }
  }, children);
};

// eslint-disable-next-line import/no-unresolved

var usePage = function usePage() {
  var _useContext = useContext(RouterContext),
      page = _useContext.page;

  return page;
};

// eslint-disable-next-line import/no-unresolved

var useParams = function useParams() {
  var _useContext = useContext(RouterContext),
      routeParams = _useContext.routeParams,
      updateParams = _useContext.updateParams;

  return [routeParams, updateParams];
};

export { Page, Router, RouterLink, usePage, useParams, useRouter };
