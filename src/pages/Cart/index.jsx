import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { jwtDecode } from 'jwt-decode';
import { Grid } from '@mui/material';
import { AddBoxOutlined, IndeterminateCheckBoxOutlined } from '@mui/icons-material';

import { selectToken } from '@containers/Client/selectors';

import classes from './style.module.scss';
import { getCart } from './actions';

const Cart = ({ token }) => {
  const [user, setUser] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(jwtDecode(token));
  }, []);

  useEffect(() => {
    dispatch(getCart({ userId: user?.id }));
  }, [dispatch, user]);

  // console.log(user);

  return (
    <div>
      <div className={classes.navigation}>
        <div className={classes.item}>Alamat</div>
        <hr className={classes.border} />
        <div className={classes.item}>Keranjang</div>
        <hr className={classes.border} />
        <div className={classes.item}>Pembayaran</div>
      </div>

      <div className={classes.cart}>
        <div className={classes.layout}>
          <div className={classes.itemSection}>
            <div className="">Daftar Pesanan</div>
            <Grid container spacing={2}>
              <Grid item sm={5}>
                <div>
                  <img src="" alt="" className={classes.image} />
                  <div className={classes.name}></div>
                </div>
              </Grid>
              <Grid item sm={3.5}>
                <div className={classes.quantity}>
                  <div>
                    <AddBoxOutlined />
                  </div>
                  <div>3</div>
                  <div>
                    <IndeterminateCheckBoxOutlined />
                  </div>
                </div>
              </Grid>
              <Grid item sm={3.5}>
                <div>
                  <div className={classes.price}>Rp 10000</div>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className={classes.priceSection}></div>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(Cart);
