import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { pick } from 'lodash';
import { Grid } from '@mui/material';
import { AddBoxOutlined, IndeterminateCheckBoxOutlined } from '@mui/icons-material';

import { selectCart } from './selector';
import { getUserCart, updateCart } from './actions';

import classes from './style.module.scss';

const Cart = ({ cart }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCart({}));
  }, [dispatch]);

  const handleUpdateItem = (action, payload, cartId) => {
    if (action === 'minus') payload = { ...payload, count: payload.count - 1 };
    if (action === 'add') payload = { ...payload, count: payload.count + 1 };

    dispatch(updateCart(payload, cartId));
  };

  return (
    <div className={classes.layout}>
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
              <Grid container spacing={3} marginBottom={2} key={index}>
                <Grid item xs={6} md={7}>
                  <div className={classes.item}>
                    <img src={item?.products?.imageUrl} alt="product-img" className={classes.image} />
                    <div className={classes.infoItem}>
                      <div className={classes.name}>{item?.products?.name}</div>
                      <div className={classes.package}>{item?.products?.packaging}</div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={3} md={3}>
                  <div className={classes.quantity}>
                    <div
                      onClick={() => handleUpdateItem('minus', pick(item, 'productId', 'userId', 'count'), item?.id)}
                    >
                      <IndeterminateCheckBoxOutlined fontSize="small" />
                    </div>
                    <div>{item?.count}</div>
                    <div onClick={() => handleUpdateItem('add', pick(item, 'productId', 'userId', 'count'), item?.id)}>
                      <AddBoxOutlined fontSize="small" />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={3} md={2}>
                  <div className={classes.price}>Rp {item?.products?.price * item?.count}</div>
                </Grid>
              </Grid>
            ))}
          </div>
          <div className={classes.priceSection}>
            <div className={classes.price}>
              <div className={classes.title}>Ringkasan Pembayaran</div>

              <div className={classes.totalItem}>
                Total Item : Rp {cart?.reduce((result, item) => result + item?.products?.price * item?.count, 0)}
              </div>
              <div className={classes.shipping}>Biaya Pengiriman : </div>
            </div>
            <div className={classes.totalPaySection}>
              <div className={classes.price}>
                <div className={classes.title}>Pembayaranmu</div>

                <div className={classes.totalItem}>
                  Rp {cart?.reduce((result, item) => result + item?.products?.price * item?.count, 0)}
                </div>
              </div>
            </div>
            <div className={classes.addressSection}>
              <div className={classes.price}>
                <div className={classes.title}>Pembayaranmu</div>

                <div className={classes.totalItem}>
                  Rp {cart?.reduce((result, item) => result + item?.products?.price * item?.count, 0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  cart: selectCart,
});

export default connect(mapStateToProps)(Cart);
