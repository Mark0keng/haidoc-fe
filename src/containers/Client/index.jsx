import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { jwtDecode } from 'jwt-decode';

import { selectLogin, selectToken } from '@containers/Client/selectors';

const Client = ({ role, login, children, token }) => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    token && setUser(jwtDecode(token));
  }, []);

  useEffect(() => {
    if (!login) {
      navigate('/login');
      console.log(token);
    }

    if (Date.now() >= user?.exp * 1000) {
      navigate('/login');
    }

    // if (role && user.role !== role) {
    //   navigate('/unauthorized');
    // }
  }, [login, token, user, navigate]);

  useEffect;

  return children;
};

Client.propTypes = {
  login: PropTypes.bool,
  token: PropTypes.string,
  children: PropTypes.element,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken,
});

export default connect(mapStateToProps)(Client);
