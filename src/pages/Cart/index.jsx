import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { jwtDecode } from 'jwt-decode';
import { Grid } from '@mui/material';
import { AddBoxOutlined, IndeterminateCheckBoxOutlined, Title } from '@mui/icons-material';

import { selectToken } from '@containers/Client/selectors';
import { selectCart } from './selector';
import { getManyCart } from './actions';

import classes from './style.module.scss';

const Cart = ({ token, cart }) => {
  const [user, setUser] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(jwtDecode(token));
  }, []);

  useEffect(() => {
    user && dispatch(getManyCart({ userId: user?.id }));
  }, [dispatch, user]);

  console.log(cart);

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
            <div className={classes.title}>Daftar Pesanan</div>
            {cart?.map((item, index) => (
              <Grid container spacing={3}>
                <Grid item md={7}>
                  <div className={classes.item}>
                    <img src={item?.products?.imageUrl} alt="product-img" className={classes.image} />
                    <div className={classes.infoItem}>
                      <div className={classes.name}>{item?.products?.name}</div>
                      <div className={classes.name}>{item?.products?.packaging}</div>
                    </div>
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className={classes.quantity}>
                    <div>
                      <AddBoxOutlined fontSize="small" />
                    </div>
                    <div>{item?.count}</div>
                    <div>
                      <IndeterminateCheckBoxOutlined fontSize="small" />
                    </div>
                  </div>
                </Grid>
                <Grid item md={2}>
                  <div className={classes.price}>Rp {item?.products?.price * item?.count}</div>
                </Grid>
              </Grid>
            ))}
          </div>
          <div className={classes.priceSection}></div>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  token: PropTypes.string,
  cart: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  cart: selectCart,
});

export default connect(mapStateToProps)(Cart);
