import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { jwtDecode } from 'jwt-decode';
import AddShoppingCartRounded from '@mui/icons-material/AddShoppingCartRounded';

import { addToCart, getOneProduct } from './actions';
import { selectProduct } from './selector';
import { selectToken } from '@containers/Client/selectors';

import classes from './style.module.scss';

const ProductDetail = ({ product, token }) => {
  const { id } = useParams();
  const [user, setUser] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(jwtDecode(token));
    dispatch(
      getOneProduct(
        id,
        () => {},
        (err) => {
          if (err.statusCode === 404) navigate('/not-found');
        }
      )
    );
  }, [dispatch]);

  const handleAddToCart = () => {
    const payload = {
      productId: Number(id),
      userId: Number(user?.id),
      count: 1,
    };
    dispatch(addToCart(payload, (cart) => {}));
  };

  return (
    <div className={classes.layout}>
      <div className={classes.mainContent}>
        <div className={classes.imageSection}>
          <img src={product?.imageUrl} alt="" className={classes.image} />
        </div>
        <div className={classes.infoSection}>
          <div className={classes.name}>{product?.name}</div>
          <div className={classes.package}>{product?.packaging}</div>
          <div className={classes.price}>Rp {product?.price}</div>

          <div className={classes.button} onClick={handleAddToCart}>
            <AddShoppingCartRounded /> Tambah Keranjang
          </div>
        </div>
      </div>
      <div className={classes.detailContent}>
        <div className={classes.section}>
          <div className={classes.title}>Deskripsi</div>
          <div className={classes.content}>{product?.description}</div>
        </div>
        <div className={classes.section}>
          <div className={classes.title}>Dosis dan Aturan Konsumsi</div>
          <div className={classes.content}>{product?.consumption}</div>
        </div>
        <div className={classes.section}>
          <div className={classes.title}> Perhatian</div>
          <div className={classes.content}>{product?.concern}</div>
        </div>
        <div className={classes.section}>
          <div className={classes.title}>Manufaktur</div>
          <div className={classes.content}>{product?.manufacture}</div>
        </div>
      </div>
    </div>
  );
};

ProductDetail.propTypes = {
  product: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  product: selectProduct,
  token: selectToken,
});

export default connect(mapStateToProps)(ProductDetail);
