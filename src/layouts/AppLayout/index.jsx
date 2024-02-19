import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Sidebar from '@components/Sidebar';
import { selectLocale, selectTheme } from '@containers/App/selectors';

import classes from './style.module.scss';

const AppLayout = ({ children, locale, theme, intl: { formatMessage } }) => {
  return (
    <div>
      <div>
        <Sidebar />
        <div className={classes.layout}>{children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  locale: selectLocale,
  theme: selectTheme,
});

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string,
  theme: PropTypes.string,
  intl: PropTypes.object,
};

export default injectIntl(connect(mapStateToProps)(AppLayout));
