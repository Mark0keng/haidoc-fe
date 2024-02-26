import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getOrderItem, getPayment, getUserOrder } from './actions';

import classes from './style.module.scss';

const Order = () => {
  const [order, setOrder] = useState('');
  const [orderItem, setOrderItem] = useState('');
  const [token, setToken] = useState('');
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePayment = () => {
    dispatch(
      getPayment({ orderId }, (token) => {
        console.log(token);
        snap.pay(token, {
          onSuccess: function (result) {
            Navigate();
          },
          onPending: function (result) {
            document.getElementById('snap-midtrans').innerHTML += JSON.stringify(result, null, 2);
          },
          onError: function (result) {
            document.getElementById('snap-midtrans').innerHTML += JSON.stringify(result, null, 2);
          },
        });
      })
    );
  };

  useEffect(() => {
    dispatch(
      getUserOrder({ orderId }, (orderData) => {
        setOrder(orderData[0]);
        dispatch(
          getOrderItem({ orderId }, (orderItemData) => {
            setOrderItem(orderItemData);
          })
        );
      })
    );
  }, [dispatch, orderId]);
  return (
    <div className={classes.layout}>
      <div className={classes.card}>
        <div className={classes.header}>Tagihan</div>

        <div className={classes.itemSection}>
          <div className={classes.title}>List Pembelian</div>
          {orderItem &&
            orderItem?.map((item, index) => (
              <div className={classes.item} key={index}>
                <div className={classes.name}>{item?.productName}</div>
                <div className={classes.quantity}>x{item?.count}</div>

                <div>
                  <div className={classes.price}>Rp {item?.productPrice}</div>
                  <div className={classes.price}>Rp {item?.productPrice * item?.count}</div>
                </div>
              </div>
            ))}
        </div>

        <div className={classes.billSection}>
          <div className={classes.title}>Pembayaranmu</div>
          <div className={classes.bill}>Rp {order?.grossAmount}</div>
        </div>

        <div className={classes.pay} onClick={handlePayment}>
          Bayar
        </div>
      </div>

      <div id="snap-midtrans"></div>
    </div>
  );
};

export default Order;
