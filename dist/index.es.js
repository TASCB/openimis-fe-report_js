import { useModulesManager, formatMessage, Helmet, FormattedMessage } from '@openimis/fe-core';
import React from 'react';
import AssessmentIcon from '@material-ui/icons/Assessment';
import flatten from 'flat';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Paper, Typography, Grid, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTabStyles } from '@openimis/fe-tasaf_common';
import { useIntl } from 'react-intl';

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
var useStyles = makeStyles(function (theme) {
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
  var tabClasses = useTabStyles();
  var intl = useIntl();
  var history = useHistory();
  var location = useLocation();
  var modulesManager = useModulesManager();
  var rights = useSelector(function (store) {
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
    return /*#__PURE__*/React.createElement("div", {
      className: classes.page
    }, /*#__PURE__*/React.createElement(Paper, {
      className: classes.paper
    }, /*#__PURE__*/React.createElement(Typography, {
      className: classes.empty,
      color: "textSecondary"
    }, formatMessage(intl, 'report', 'noReports'))));
  }
  var Panel = report.component;
  return /*#__PURE__*/React.createElement("div", {
    className: classes.page
  }, /*#__PURE__*/React.createElement(Helmet, {
    title: formatMessage(intl, section.module, section.label)
  }), /*#__PURE__*/React.createElement(Paper, {
    className: classes.paper
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    className: "".concat(classes.tableTitle, " ").concat(tabClasses.tabs, " ").concat(classes.wrap)
  }, reports.map(function (r) {
    return /*#__PURE__*/React.createElement(Tab, {
      key: r.key,
      value: r.key,
      selected: r.key === report.key,
      onChange: onChange,
      className: r.key === report.key ? tabClasses.selectedTab : tabClasses.unselectedTab,
      label: formatMessage(intl, section.module, r.label)
    });
  })), /*#__PURE__*/React.createElement(Panel, _extends({
    key: "".concat(section.key, ".").concat(report.key)
  }, (_report$props = report.props) !== null && _report$props !== void 0 ? _report$props : {}))));
}

var ROUTE_REPORTS = 'reports';
var DEFAULT_CONFIG = {
  "translations": [{
    key: "en",
    messages: flatten(messages_en)
  }],
  "core.Router": [{
    path: ROUTE_REPORTS,
    component: ReportsPage
  }],
  "socialProtection.MainMenu": [{
    text: /*#__PURE__*/React.createElement(FormattedMessage, {
      module: 'report',
      id: 'menu.reports'
    }),
    icon: /*#__PURE__*/React.createElement(AssessmentIcon),
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

export { REPORT_TABS_CONTRIBUTION_KEY, ReportModule };
//# sourceMappingURL=index.es.js.map
