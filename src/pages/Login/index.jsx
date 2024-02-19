import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classes from './style.module.scss';
import { useState } from 'react';
import { login } from './actions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const payload = {
      email,
      password,
    };
    console.log('asdasd');
    dispatch(
      login(
        payload,
        () => {
          navigate('/dashboard');
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
          <div className={classes.label}>Email</div>
          <input
            type="text"
            className={classes.input}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
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
