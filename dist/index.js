'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var feCore = require('@openimis/fe-core');
var React = require('react');
var AssessmentIcon = require('@material-ui/icons/Assessment');
var flatten = require('flat');
var reactRedux = require('react-redux');
var reactRouterDom = require('react-router-dom');
var core = require('@material-ui/core');
var styles = require('@material-ui/core/styles');
var feTasaf_common = require('@openimis/fe-tasaf_common');
var reactIntl = require('react-intl');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var AssessmentIcon__default = /*#__PURE__*/_interopDefaultLegacy(AssessmentIcon);
var flatten__default = /*#__PURE__*/_interopDefaultLegacy(flatten);

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

var noReports = "You have no reports available.";
var messages_en = {
	"menu.reports": "Reports",
	"page.title": "Reports",
	noReports: noReports
};

var REPORT_TABS_CONTRIBUTION_KEY = 'report.ReportTabs';
var useStyles = styles.makeStyles(function (theme) {
  return {
    page: theme.page,
    paper: theme.paper.paper,
    tableTitle: theme.table.title,
    empty: {
      padding: theme.spacing(3)
    },
    wrap: {
      '&&': {
        flexWrap: 'wrap'
      }
    }
  };
});

// Each module contributes a section { key, module, label, rights, position, reports: [{ key, label,
// component, props }] }. The menu opens a section (?tab=<section>); its reports are the tabs.
function ReportsPage() {
  var _modulesManager$getCo, _sections$find, _section$reports, _reports$find, _report$props;
  var classes = useStyles();
  var tabClasses = feTasaf_common.useTabStyles();
  var intl = reactIntl.useIntl();
  var history = reactRouterDom.useHistory();
  var location = reactRouterDom.useLocation();
  var modulesManager = feCore.useModulesManager();
  var rights = reactRedux.useSelector(function (store) {
    var _store$core$user$i_us, _store$core;
    return (_store$core$user$i_us = (_store$core = store.core) === null || _store$core === void 0 || (_store$core = _store$core.user) === null || _store$core === void 0 || (_store$core = _store$core.i_user) === null || _store$core === void 0 ? void 0 : _store$core.rights) !== null && _store$core$user$i_us !== void 0 ? _store$core$user$i_us : [];
  });
  var sections = ((_modulesManager$getCo = modulesManager.getContribs(REPORT_TABS_CONTRIBUTION_KEY)) !== null && _modulesManager$getCo !== void 0 ? _modulesManager$getCo : []).filter(function (s) {
    var _s$rights;
    return !((_s$rights = s.rights) !== null && _s$rights !== void 0 && _s$rights.length) || s.rights.some(function (r) {
      return rights.includes(r);
    });
  }).sort(function (a, b) {
    var _a$position, _b$position;
    return ((_a$position = a.position) !== null && _a$position !== void 0 ? _a$position : 99) - ((_b$position = b.position) !== null && _b$position !== void 0 ? _b$position : 99);
  });
  var params = new URLSearchParams(location.search);
  var section = (_sections$find = sections.find(function (s) {
    return s.key === params.get('tab');
  })) !== null && _sections$find !== void 0 ? _sections$find : sections[0];
  var reports = (_section$reports = section === null || section === void 0 ? void 0 : section.reports) !== null && _section$reports !== void 0 ? _section$reports : [];
  var report = (_reports$find = reports.find(function (r) {
    return r.key === params.get('report');
  })) !== null && _reports$find !== void 0 ? _reports$find : reports[0];
  var onChange = function onChange(_, key) {
    return history.replace({
      pathname: location.pathname,
      search: "?tab=".concat(section.key, "&report=").concat(key)
    });
  };
  if (!report) {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: classes.page
    }, /*#__PURE__*/React__default["default"].createElement(core.Paper, {
      className: classes.paper
    }, /*#__PURE__*/React__default["default"].createElement(core.Typography, {
      className: classes.empty,
      color: "textSecondary"
    }, feCore.formatMessage(intl, 'report', 'noReports'))));
  }
  var Panel = report.component;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: classes.page
  }, /*#__PURE__*/React__default["default"].createElement(feCore.Helmet, {
    title: feCore.formatMessage(intl, section.module, section.label)
  }), /*#__PURE__*/React__default["default"].createElement(core.Paper, {
    className: classes.paper
  }, /*#__PURE__*/React__default["default"].createElement(core.Grid, {
    container: true,
    className: "".concat(classes.tableTitle, " ").concat(tabClasses.tabs, " ").concat(classes.wrap)
  }, reports.map(function (r) {
    return /*#__PURE__*/React__default["default"].createElement(core.Tab, {
      key: r.key,
      value: r.key,
      selected: r.key === report.key,
      onChange: onChange,
      className: r.key === report.key ? tabClasses.selectedTab : tabClasses.unselectedTab,
      label: feCore.formatMessage(intl, section.module, r.label)
    });
  })), /*#__PURE__*/React__default["default"].createElement(Panel, _extends({
    key: "".concat(section.key, ".").concat(report.key)
  }, (_report$props = report.props) !== null && _report$props !== void 0 ? _report$props : {}))));
}

var ROUTE_REPORTS = 'reports';
var DEFAULT_CONFIG = {
  "translations": [{
    key: "en",
    messages: flatten__default["default"](messages_en)
  }],
  "core.Router": [{
    path: ROUTE_REPORTS,
    component: ReportsPage
  }],
  "socialProtection.MainMenu": [{
    text: /*#__PURE__*/React__default["default"].createElement(feCore.FormattedMessage, {
      module: 'report',
      id: 'menu.reports'
    }),
    icon: /*#__PURE__*/React__default["default"].createElement(AssessmentIcon__default["default"]),
    route: "/".concat(ROUTE_REPORTS),
    filter: function filter() {
      return true;
    },
    id: 'report.reports'
  }],
  "refs": [{
    key: 'report.route.reports',
    ref: ROUTE_REPORTS
  }]
};
var ReportModule = function ReportModule(cfg) {
  return _objectSpread2(_objectSpread2({}, DEFAULT_CONFIG), cfg);
};

exports.REPORT_TABS_CONTRIBUTION_KEY = REPORT_TABS_CONTRIBUTION_KEY;
exports.ReportModule = ReportModule;
//# sourceMappingURL=index.js.map
