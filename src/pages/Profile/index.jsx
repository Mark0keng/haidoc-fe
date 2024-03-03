import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import classes from './style.module.scss';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { selectToken } from '@containers/Client/selectors';
import { createStructuredSelector } from 'reselect';
import { jwtDecode } from 'jwt-decode';
import { DriveFileRenameOutlineRounded } from '@mui/icons-material';

const Profile = ({ token }) => {
  const [user, setUsername] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(jwtDecode(token));
  }, []);

  return (
    <div className={classes.layout}>
      <div className={classes.card}>
        <div className={classes.imageSection}>
          <Avatar sx={{ width: 84, height: 84 }}></Avatar>
        </div>
        <div className={classes.infoSection}>
          <div className={classes.username}>{user?.username}</div>
          <div className={classes.edit}>
            <DriveFileRenameOutlineRounded />
            Edit Profile
          </div>
        </div>
      </div>
      <div className={classes.partner}>Datfar Sebagai Dokter Mitra</div>
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
