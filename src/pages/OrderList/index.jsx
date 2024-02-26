import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import classes from './style.module.scss';
import { getUserOrder } from '@pages/Order/actions';

const OrderList = () => {
  const [orders, setOrders] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getUserOrder({}, (orderData) => {
        setOrders(orderData);
      })
    );
  }, [dispatch]);

  return (
    <div className={classes.layout}>
      <div className={classes.orderSertion}>
        <div className={classes.card}></div>
      </div>
    </div>
  );
};

export default OrderList;
