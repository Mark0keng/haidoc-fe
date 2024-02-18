import { useNavigate } from 'react-router-dom';

import classes from './style.module.scss';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.layout}>
      <div className={classes.loginSection}>
        <div className={classes.title}>Login</div>

        <div className={classes.formControl}>
          <div className={classes.label}>Email</div>
          <input type="text" className={classes.input} />
        </div>
        <div className={classes.formControl}>
          <div className={classes.label}>Password</div>
          <input type="text" className={classes.input} />
        </div>

        <div className={classes.button}>Submit</div>
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
