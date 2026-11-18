import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Grid, Paper, Tab, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  formatMessage, Helmet, useModulesManager,
} from '@openimis/fe-core';
import { useTabStyles } from '@openimis/fe-tasaf_common';
import { useIntl } from 'react-intl';

export const REPORT_TABS_CONTRIBUTION_KEY = 'report.ReportTabs';

const useStyles = makeStyles((theme) => ({
  page: theme.page,
  paper: theme.paper.paper,
  tableTitle: theme.table.title,
  empty: { padding: theme.spacing(3) },
  wrap: { '&&': { flexWrap: 'wrap' } },
}));

// Each module contributes a section { key, module, label, rights, position, reports: [{ key, label,
// component, props }] }. The menu opens a section (?tab=<section>); its reports are the tabs.
function ReportsPage() {
  const classes = useStyles();
  const tabClasses = useTabStyles();
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const modulesManager = useModulesManager();
  const rights = useSelector((store) => store.core?.user?.i_user?.rights ?? []);

  const sections = (modulesManager.getContribs(REPORT_TABS_CONTRIBUTION_KEY) ?? [])
    .filter((s) => !s.rights?.length || s.rights.some((r) => rights.includes(r)))
    .sort((a, b) => (a.position ?? 99) - (b.position ?? 99));
  const params = new URLSearchParams(location.search);
  const section = sections.find((s) => s.key === params.get('tab')) ?? sections[0];
  const reports = section?.reports ?? [];
  const report = reports.find((r) => r.key === params.get('report')) ?? reports[0];

  const onChange = (_, key) => history.replace({
    pathname: location.pathname, search: `?tab=${section.key}&report=${key}`,
  });

  if (!report) {
    return (
      <div className={classes.page}>
        <Paper className={classes.paper}>
          <Typography className={classes.empty} color="textSecondary">
            {formatMessage(intl, 'report', 'noReports')}
          </Typography>
        </Paper>
      </div>
    );
  }
  const Panel = report.component;

  return (
    <div className={classes.page}>
      <Helmet title={formatMessage(intl, section.module, section.label)} />
      <Paper className={classes.paper}>
        <Grid container className={`${classes.tableTitle} ${tabClasses.tabs} ${classes.wrap}`}>
          {reports.map((r) => (
            <Tab
              key={r.key}
              value={r.key}
              selected={r.key === report.key}
              onChange={onChange}
              className={r.key === report.key ? tabClasses.selectedTab : tabClasses.unselectedTab}
              label={formatMessage(intl, section.module, r.label)}
            />
          ))}
        </Grid>
        <Panel key={`${section.key}.${report.key}`} {...(report.props ?? {})} />
      </Paper>
    </div>
  );
}

export default ReportsPage;
