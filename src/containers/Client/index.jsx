import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLogin, selectToken } from '@containers/Client/selectors';
import { jwtDecode } from 'jwt-decode';

const Client = ({ role, login, children, token }) => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (login && !login) {
      navigate('/login');
    }

    token && setUser(jwtDecode(token));

    if (role && user.role !== role) {
      navigate('/unauthorized');
    }
  }, [role, token, login, navigate]);

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
