import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AddShoppingCartRounded from '@mui/icons-material/AddShoppingCartRounded';
import { Add, Remove } from '@mui/icons-material';

import { addToCart, getOneProduct } from './actions';
import { selectProduct } from './selector';
import { selectCart } from '@pages/Cart/selector';
import { deleteCart, getUserCart, updateCart } from '@pages/Cart/actions';

import classes from './style.module.scss';
import { Snackbar } from '@mui/material';

const ProductDetail = ({ product, cart }) => {
  const { id } = useParams();
  const [productInCart, setProductInCart] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getOneProduct(
        id,
        (dataProduct) => {
          dispatch(
            getUserCart({}, (dataCart) => {
              const inCart = dataCart?.filter((item) => item?.productId === dataProduct?.id);
              setProductInCart(inCart[0]);
            })
          );
        },
        (err) => {
          if (err.statusCode === 404) navigate('/not-found');
        }
      )
    );
  }, [dispatch, id]);

  const handleSnackbar = () => {
    setOpenSnackbar(!openSnackbar);
  };

  const handleAddToCart = () => {
    const payload = {
      productId: Number(id),
      count: 1,
    };
    dispatch(
      addToCart(
        payload,
        () => {
          dispatch(
            getUserCart({}, (dataCart) => {
              const inCart = dataCart?.filter((item) => item?.productId === product?.id);
              setProductInCart(inCart[0]);
            })
          );
        },
        (err) => {
          if (err.statusCode === 401) navigate('/login');
        }
      )
    );
  };

  const handleUpdateItem = (action, payload, cartId) => {
    if (action === 'minus') payload = { ...payload, count: payload.count - 1 };
    if (action === 'add') payload = { ...payload, count: payload.count + 1 };

    if (payload?.count < 1) {
      dispatch(
        deleteCart(cartId, () => {
          dispatch(
            getUserCart({}, (dataCart) => {
              const inCart = dataCart?.filter((item) => item?.productId === product?.id);
              setProductInCart(inCart[0]);
            })
          );
        })
      );
    } else {
      dispatch(
        updateCart(
          payload,
          cartId,
          () => {
            dispatch(
              getUserCart({}, (dataCart) => {
                const inCart = dataCart?.filter((item) => item?.productId === product?.id);
                setProductInCart(inCart[0]);
              })
            );
          },
          (err) => {
            if (err.statusCode === 401) {
              handleSnackbar();
            }
          }
        )
      );
    }
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
          <div className={classes.stock}>Stok : {product?.stock}</div>

          {product?.stock >= 1 ? (
            productInCart ? (
              <div className={classes.quantity}>
                <div
                  className={classes.remove}
                  onClick={() => {
                    const payload = {
                      productId: productInCart?.productId,
                      userId: productInCart?.userId,
                      count: productInCart?.count,
                    };
                    handleUpdateItem('minus', payload, productInCart?.id);
                  }}
                >
                  <Remove />
                </div>
                <div className={classes.count}>{productInCart.count}</div>
                <div
                  className={classes.add}
                  onClick={() => {
                    const payload = {
                      productId: productInCart?.productId,
                      userId: productInCart?.userId,
                      count: productInCart?.count,
                    };
                    handleUpdateItem('add', payload, productInCart?.id);
                  }}
                >
                  <Add />
                </div>
              </div>
            ) : (
              <div className={classes.button} onClick={handleAddToCart}>
                <AddShoppingCartRounded /> Tambah Keranjang
              </div>
            )
          ) : (
            <div className={classes.empty}>Stock Habis</div>
          )}
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
  cart: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  product: selectProduct,
  cart: selectCart,
});

export default connect(mapStateToProps)(ProductDetail);
