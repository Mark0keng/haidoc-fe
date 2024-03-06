import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { register } from './actions';

import classes from './style.module.scss';
import { encryptPayload } from '@utils/encryptPayload';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const payload = {
      username: encryptPayload(username),
      email: encryptPayload(email),
      password: encryptPayload(password),
      role: encryptPayload('1'),
    };

    // console.log(payload);

    dispatch(
      register(
        payload,
        () => {
          navigate('/login');
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
        <div className={classes.title}>Register</div>

        {error && <div className={classes.error}>{error}</div>}

        <div className={classes.formControl}>
          <div className={classes.label}>Username</div>
          <input
            type="text"
            className={classes.input}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
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
          Already have account?{' '}
          <span
            className={classes.register}
            onClick={() => {
              navigate('/login');
            }}
          >
            login here
          </span>
        </div>
      </div>
      <div className={classes.heroSection}>
        <img src="" alt="" className={classes.image} />
      </div>
    </div>
  );
};

export default Register;
