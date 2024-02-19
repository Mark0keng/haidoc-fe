import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import KeyboardDoubleArrowLeftRounded from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';

import classes from './style.module.scss';
import { HomeOutlined, HomeRounded, LogoutOutlined, MedicationOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

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
        <div className={classes.name}>Farras Arkan</div>
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

export default Sidebar;
