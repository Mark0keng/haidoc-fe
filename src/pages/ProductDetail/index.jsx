import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getOneProduct } from './actions';

import classes from './style.module.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneProduct(id));
  }, [dispatch]);

  return (
    <div>
      <div className={classes.mainContent}>
        <div className={classes.imageSection}>
          <img src="" alt="" className={classes.image} />
        </div>
        <div className={classes.infoSection}>
          <div className={classes.name}>Panadol</div>
          <div className={classes.package}>per Strip</div>
          <div className={classes.price}>Rp 10000</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
