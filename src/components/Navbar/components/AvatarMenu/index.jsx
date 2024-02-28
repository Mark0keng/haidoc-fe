import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Divider, Menu, MenuItem, MenuList, Paper } from '@mui/material';

import { setLogin, setToken } from '@containers/Client/actions';

import classes from './style.module.scss';
import { LogoutRounded, ReceiptLongOutlined } from '@mui/icons-material';
import { setAddress } from '@pages/Address/actions';

const AvatarMenu = () => {
  const [menuPosition, setMenuPosition] = useState(null);
  const open = Boolean(menuPosition);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const handleLogout = () => {
    dispatch(setLogin(false));
    dispatch(setToken(null));
    dispatch(setAddress(null));
  };

  return (
    <>
      <Avatar style={{ width: 32, height: 32, cursor: 'pointer' }} onClick={handleClick} />
      <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
        <MenuItem style={{ cursor: 'pointer', fontSize: 14 }}>
          <div className={classes.menu} onClick={() => navigate('/order')}>
            <ReceiptLongOutlined style={{ fontSize: 20 }} />
            <div>Order</div>
          </div>
        </MenuItem>
        <MenuItem style={{ cursor: 'pointer', fontSize: 14 }}>
          <div className={classes.logout} onClick={handleLogout}>
            <LogoutRounded style={{ fontSize: 20 }} />
            <div>Logout</div>
          </div>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AvatarMenu;
