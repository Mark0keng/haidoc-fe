import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { getEmailForgotPassword } from './actions';

import classes from './style.module.scss';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(
      getEmailForgotPassword({ email }, (successMsg) => {
        setMessage(successMsg);
        setEmail('');
      })
    );
  };
  return (
    <div className={classes.layout}>
      <div className={classes.card}>
        <div className={classes.title}>Lupa Password</div>

        {message && <div className={classes.alert}>{message}</div>}

        <div className={classes.info}>Kami akan mengirimkan email untuk mengganti password</div>
        <div className={classes.formControl}>
          <div className={classes.label}>Email</div>
          <input type="text" className={classes.input} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className={classes.button} onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
