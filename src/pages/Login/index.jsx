import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from './actions';
import { setAddress } from '@pages/Address/actions';
import { setCart } from '@pages/Cart/actions';

import classes from './style.module.scss';
import { encryptPayload } from '@utils/encryptPayload';

const Login = () => {
  // const [email, setEmail] = useState('');
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const payload = {
      credential: encryptPayload(credential),
      password: encryptPayload(password),
    };
    dispatch(
      login(
        payload,
        (loginData) => {
          dispatch(setAddress(null));
          dispatch(setCart(null));

          if (loginData?.role === 1) {
            navigate('/');
          } else {
            navigate('/dashboard');
          }
        },
        (err) => {
          setError(err.message);
        }
      )
    );
  };

  return (
    <div className={classes.layout}>
      <div className={classes.loginSection}>
        <div className={classes.title}>Login</div>

        {error && <div className={classes.error}>{error}</div>}

        <div className={classes.formControl}>
          <div className={classes.label}>Username/email</div>
          <input
            type="text"
            className={classes.input}
            value={credential}
            onChange={(e) => {
              setCredential(e.target.value);
            }}
          />
        </div>
        {/* <div className={classes.formControl}>
          <div className={classes.label}>Email</div>
          <input
            type="text"
            className={classes.input}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div> */}
        <div className={classes.formControl}>
          <div className={classes.label}>Password</div>
          <input
            type="password"
            className={classes.input}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className={classes.forgot} onClick={() => navigate('/forgot-password')}>
            Lupa Password?
          </div>
        </div>

        <div className={classes.button} onClick={handleSubmit}>
          Submit
        </div>
        <div className={classes.noAccount}>
          Don't have an account?{' '}
          <span
            className={classes.register}
            onClick={() => {
              navigate('/register');
            }}
          >
            register here
          </span>
        </div>
      </div>
      <div className={classes.heroSection}>
        <img src="" alt="" className={classes.image} />
      </div>
    </div>
  );
};

export default Login;
