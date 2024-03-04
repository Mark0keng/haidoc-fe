import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import ShoppingCartCheckoutOutlined from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { createStructuredSelector } from 'reselect';
import { Badge } from '@mui/material';

import AvatarMenu from './components/AvatarMenu';
import { setLocale, setTheme } from '@containers/App/actions';

import { selectLogin, selectToken } from '@containers/Client/selectors';
import { selectCart } from '@pages/Cart/selector';

import classes from './style.module.scss';
import { jwtDecode } from 'jwt-decode';
import { ChatOutlined } from '@mui/icons-material';

const Navbar = ({ login, token, locale, theme, cart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [me, setMe] = useState('');
  const [menuPosition, setMenuPosition] = useState(null);
  const [totalCart, setTotalCart] = useState('');
  const open = Boolean(menuPosition);

  useEffect(() => {
    token && setMe(jwtDecode(token));
  }, []);

  useEffect(() => {
    const totalCount = cart?.reduce((result, item) => result + item?.count, 0);
    setTotalCart(totalCount);
  }, [cart]);

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const handleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage} onClick={goHome}>
          <img src="/haidoc.svg" alt="logo" className={classes.logo} />
          {/* <div className={classes.title}>{title}</div> */}
        </div>
        <div className={classes.toolbar}>
          {login && <AvatarMenu me={me} />}
          {login && (
            <div className={classes.chat} onClick={() => navigate('/chat-list/user')}>
              <ChatOutlined />
            </div>
          )}
          {login && (
            <div className={classes.cart} onClick={() => navigate('/checkout/cart')}>
              <Badge badgeContent={totalCart} color="primary">
                <ShoppingCartCheckoutOutlined />
              </Badge>
            </div>
          )}
          {!login && (
            <div className={classes.login} onClick={() => navigate('/login')}>
              Login
            </div>
          )}
          <div className={classes.theme} onClick={handleTheme} data-testid="toggleTheme">
            {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
          </div>

          {/* <div className={classes.toggle} onClick={handleClick}>
            <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
            <div className={classes.lang}>{locale}</div>
            <ExpandMoreIcon />
          </div> */}
        </div>
        <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
          <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/id.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_id" />
              </div>
            </div>
          </MenuItem>
          <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/en.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_en" />
              </div>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string,
  login: PropTypes.bool,
  cart: PropTypes.array,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  cart: selectCart,
  token: selectToken,
});

export default connect(mapStateToProps)(Navbar);
