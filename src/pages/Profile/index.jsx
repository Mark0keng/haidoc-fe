import { Avatar } from '@mui/material';
import classes from './style.module.scss';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { select } from 'redux-saga/effects';
import { selectToken } from '@containers/Client/selectors';
import { createStructuredSelector } from 'reselect';

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    di;
  }, []);
  return (
    <div className={classes.layout}>
      <div className={classes.card}>
        <div className={classes.imageSection}>
          <Avatar sx={{ width: 84, height: 84 }}></Avatar>
        </div>
        <div className={classes.username}>asda</div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(Profile);
