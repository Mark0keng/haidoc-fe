import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getOrderItem, getPayment, getUserOrder, updateOrder } from './actions';

import classes from './style.module.scss';

const Order = () => {
  const [order, setOrder] = useState('');
  const [orderItem, setOrderItem] = useState('');
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const handlePayment = () => {
    dispatch(
      getPayment({ orderId, category: 'shop' }, (token) => {
        snap.pay(token, {
          onSuccess: function (result) {
            dispatch(
              updateOrder(
                {
                  orderId: order?.orderId,
                  grossAmount: order?.grossAmount,
                  shippingCost: order?.shippingCost,
                  userId: order?.userId,
                  status: 'success',
                },
                order?.id,
                () => {
                  dispatch(
                    getUserOrder({ orderId }, (orderData) => {
                      setOrder(orderData[0]);
                    })
                  );
                }
              )
            );
          },
          onPending: function (result) {},
          onError: function (result) {
            dispatch(
              updateOrder(
                {
                  orderId: order?.orderId,
                  grossAmount: order?.grossAmount,
                  shippingCost: order?.shippingCost,
                  userId: order?.userId,
                  status: 'failed',
                },
                order?.id,
                () => {
                  dispatch(
                    getUserOrder({ orderId }, (orderData) => {
                      setOrder(orderData[0]);
                    })
                  );
                }
              )
            );
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
        <div className={classes.orderId}>#{order?.orderId}</div>
        <div className={classes.itemSection}>
          <div className={classes.title}>List Barang</div>
          {orderItem &&
            orderItem?.map((item, index) => (
              <div className={classes.item} key={index}>
                <div className={classes.name}>&#x2022; {item?.productName}</div>
                <div className={classes.quantity}>x{item?.count}</div>

                <div>
                  <div className={classes.price}>Rp {item?.productPrice}</div>
                  <div className={classes.price}>Rp {item?.productPrice * item?.count}</div>
                </div>
              </div>
            ))}
        </div>

        <div className={classes.shippingSection}>
          <div className={classes.title}>Biaya Pengiriman</div>
          <div className={classes.bill}>Rp {order?.shippingCost}</div>
        </div>

        <div className={classes.billSection}>
          <div className={classes.title}>Pembayaranmu</div>
          <div className={classes.bill}>Rp {order?.grossAmount}</div>
        </div>

        {order?.status === 'pending' && (
          <div className={classes.pay} onClick={handlePayment}>
            Bayar
          </div>
        )}
        {order?.status === 'success' && <div className={classes.payDisable}>Pembayaran Sukses</div>}
      </div>
    </div>
  );
};

export default Order;
