import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import classes from './style.module.scss';
import { getUserOrder } from '@pages/Order/actions';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getUserOrder({}, (orderData) => {
        setOrders(orderData);
      })
    );
  }, [dispatch]);

  return (
    <div className={classes.layout}>
      <div className={classes.orderSection}>
        <div className={classes.title}>Order Anda</div>

        {orders &&
          orders?.map((order, index) => (
            <div className={classes.card} key={index} onClick={() => navigate(`/checkout/order/${order?.orderId}`)}>
              <div className={classes.orderId}>{order?.orderId}</div>
              <div className={classes.info}>
                {order?.status === 'pending' && <div className={classes.statusPending}>{order?.status}</div>}
                {order?.status === 'success' && <div className={classes.statusPending}>{order?.status}</div>}
                {order?.status === 'failed' && <div className={classes.statusPending}>{order?.status}</div>}
                <div className={classes.amount}>Rp {order?.grossAmount}</div>
              </div>
              <div className={classes.createdAt}>Dibuat pada : {order?.createdAt}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderList;
