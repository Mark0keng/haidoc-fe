import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { pick } from 'lodash';
import { Grid } from '@mui/material';
import { AddBoxOutlined, IndeterminateCheckBoxOutlined, Room } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { selectCart } from './selector';
import { deleteCart, getShippingCost, getUserCart, updateCart } from './actions';
import { getAddress } from '@pages/Address/actions';
import { selectAddress } from '@pages/Address/selector';

import classes from './style.module.scss';
import { createOrder, createOrderItem } from '@pages/Order/actions';

const Cart = ({ cart, address }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shippingCost, setShippingCost] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  useEffect(() => {
    dispatch(
      getAddress(
        {},
        () => {
          dispatch(getUserCart({}));
          dispatch(
            getShippingCost(
              {
                origin: 153,
                destination: address?.cityId,
                weight: 1000,
                courier: 'jne',
              },
              (costData) => {
                costData && setShippingCost(costData);
                countTotalPrice(cart, costData);
              }
            )
          );
        },
        (err) => {
          err.statusCode === 404 && navigate('/checkout/address');
        }
      )
    );
  }, [dispatch]);

  useEffect(() => {
    countTotalPrice(cart, shippingCost);
  }, [cart]);

  const countTotalPrice = (cart, cost) => {
    const totalPrice = cart?.reduce((result, item) => result + item?.products?.price * item?.count, 0);
    cart && setTotalPrice(totalPrice + cost);
  };

  const handleUpdateItem = (action, payload, cartId) => {
    if (action === 'minus') payload = { ...payload, count: payload.count - 1 };
    if (action === 'add') payload = { ...payload, count: payload.count + 1 };

    if (payload?.count < 1) {
      dispatch(
        deleteCart(cartId, () => {
          dispatch(getUserCart({}));
        })
      );
    } else {
      dispatch(updateCart(payload, cartId));
    }
  };

  const handleSubmit = () => {
    const payload = {
      grossAmount: totalPrice + shippingCost,
    };
    dispatch(
      createOrder(payload, (orderData) => {
        for (const item of cart) {
          dispatch(
            createOrderItem({
              orderId: orderData?.orderId,
              productName: item.products.name,
              productPrice: item.products.price,
              count: item.count,
            })
          );
        }
        navigate('checkout/order');
      })
    );
  };

  // console.log(cart);

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
                      className={classes.add}
                      onClick={() => handleUpdateItem('minus', pick(item, 'productId', 'userId', 'count'), item?.id)}
                    >
                      <IndeterminateCheckBoxOutlined fontSize="small" />
                    </div>
                    <div>{item?.count}</div>
                    <div
                      className={classes.minus}
                      onClick={() => handleUpdateItem('add', pick(item, 'productId', 'userId', 'count'), item?.id)}
                    >
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
          <div className={classes.paymentSection}>
            <div className={classes.subSection}>
              <div className={classes.title}>Ringkasan Pembayaran</div>

              <div className={classes.totalItem}>
                <div>Total Item :</div>
                <div>Rp {cart?.reduce((result, item) => result + item?.products?.price * item?.count, 0)}</div>
              </div>
              <div className={classes.shipping}>
                <div>Biaya Pengiriman :</div>
                <div>Rp {shippingCost ? shippingCost : 0}</div>
              </div>
            </div>
            <div className={classes.subSection}>
              <div className={classes.price}>
                <div className={classes.title}>Pembayaranmu</div>

                <div className={classes.totalPrice}>Rp {totalPrice}</div>
              </div>
            </div>
            <div className={classes.subSection}>
              <div className={classes.header}>
                <div className={classes.title}>Alamat</div>
                <div className={classes.changeAddress} onClick={() => navigate('/checkout/address')}>
                  Ubah
                </div>
              </div>

              <div className={classes.addressBox}>
                <Room />
                <div className={classes.address}>
                  <div>{address?.fullAddress}</div>
                </div>
              </div>
            </div>
            <div className={classes.submitSection}>
              <div className={classes.button} onClick={handleSubmit}>
                Berikutnya
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
  address: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  cart: selectCart,
  address: selectAddress,
});

export default connect(mapStateToProps)(Cart);
