import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import classes from './style.module.scss';
import { encryptPayload } from '@utils/encryptPayload';
import { changePassword } from './actions';

const ChangePassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const payload = {
      password: encryptPayload(password),
      confirmPassword: encryptPayload(confirmPassword),
      token,
    };
    // console.log(payload);
    dispatch(
      changePassword(
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
      <div className={classes.card}>
        <div className={classes.title}>Ganti Password</div>

        {error && <div className={classes.alert}>{error}</div>}

        <div className={classes.formControl}>
          <div className={classes.label}>Password</div>
          <input
            type="password"
            className={classes.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={classes.formControl}>
          <div className={classes.label}>Konfirmasi Password</div>
          <input
            type="password"
            className={classes.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className={classes.button} onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
