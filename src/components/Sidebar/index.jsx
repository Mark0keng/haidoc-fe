import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import KeyboardDoubleArrowLeftRounded from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import { HomeOutlined, HomeRounded, LogoutOutlined, MedicationOutlined } from '@mui/icons-material';

import { selectToken } from '@containers/Client/selectors';

import classes from './style.module.scss';

const Sidebar = ({ token }) => {
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(jwtDecode(token));
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classes.layout}>
      <div className={classes.openClose}>
        <div className={classes.button} onClick={handleOpen}>
          <KeyboardDoubleArrowLeftRounded />
        </div>
      </div>

      <div className={classes.profile}>
        <Avatar />
        <div className={classes.name}>{user?.username}</div>
      </div>

      <div className={classes.navigation}>
        <div className={classes.item}>
          <HomeOutlined />
          <div className={classes.name}>Home</div>
        </div>
        <div className={classes.item}>
          <MedicationOutlined />
          <div
            className={classes.name}
            onClick={() => {
              navigate('/dashboard/product');
            }}
          >
            Product
          </div>
        </div>
        <div className={classes.item}>
          <LogoutOutlined />
          <div className={classes.name}>Logout</div>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(Sidebar);
