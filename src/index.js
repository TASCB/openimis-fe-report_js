import { FormattedMessage } from '@openimis/fe-core';
import React from 'react';
import AssessmentIcon from '@material-ui/icons/Assessment';
import flatten from 'flat';
import messages_en from "./translations/en.json";
import ReportsPage, { REPORT_TABS_CONTRIBUTION_KEY } from './pages/ReportsPage';

const ROUTE_REPORTS = 'reports';

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: flatten(messages_en) }],
  "core.Router": [
    { path: ROUTE_REPORTS, component: ReportsPage },
  ],
  "socialProtection.MainMenu": [
    {
      text: React.createElement(FormattedMessage, { module: 'report', id: 'menu.reports' }),
      icon: React.createElement(AssessmentIcon),
      route: `/${ROUTE_REPORTS}`,
      filter: () => true,
      id: 'report.reports',
    },
  ],
  "refs": [
    { key: 'report.route.reports', ref: ROUTE_REPORTS },
  ],
}

export { REPORT_TABS_CONTRIBUTION_KEY };

export const ReportModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}