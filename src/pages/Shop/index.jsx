import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

import { selectProducts } from '@pages/ProductDashboard/selector';
import { getAllProduct } from '@pages/ProductDashboard/actions';

import classes from './style.module.scss';

const Shop = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getAllProduct({}, (productData) => {
        setProducts(productData);
      })
    );
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(
      getAllProduct({ name: search }, (productData) => {
        setProducts(productData);
      })
    );
  };

  return (
    <div>
      <div className={classes.banner}>
        <div className={classes.content}>
          <div className={classes.title}>Haidoc Shop</div>
          <div className={classes.subTitle}>Solusi sehat terpercaya</div>

          <div className={classes.search}>
            <input type="text" className={classes.input} value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className={classes.button} onClick={handleSearch}>
              Search
            </div>
          </div>
        </div>
      </div>

      <div className={classes.shopSection}>
        <div className={classes.layout}>
          <div className={classes.filter}>
            <div className={classes.header}>
              <div className={classes.title}>Category</div>
              <div className={classes.reset}>Reset</div>
            </div>
            <div className={classes.list}>
              <div className={classes.item}>
                <input type="radio" name="category" />
                <div className={classes.label}>Obat</div>
              </div>
              <div className={classes.item}>
                <input type="radio" name="category" />
                <div className={classes.label}>Obat</div>
              </div>
              <div className={classes.item}>
                <input type="radio" name="category" />
                <div className={classes.label}>Obat</div>
              </div>
              <div className={classes.item}>
                <input type="radio" name="category" />
                <div className={classes.label}>Obat</div>
              </div>
            </div>
          </div>
          <div className={classes.catalogue}>
            <Grid container spacing={2} paddingX={3}>
              {products?.rows?.map((product, index) => (
                <Grid item xs={6} md={4} lg={3} xl={2.4} key={index}>
                  <div
                    className={classes.card}
                    onClick={() => {
                      navigate(`/product/${product?.id}`);
                    }}
                  >
                    <div className={classes.productImg}>
                      <img src={product.imageUrl} alt="product-img" className={classes.image} />
                      {product?.stock < 1 && <div className={classes.empty}>Stok Habis</div>}
                    </div>
                    <div className={classes.productInfo}>
                      <div className={classes.title}>{product?.name}</div>
                      <div className={classes.package}>{product?.packaging}</div>
                      <div className={classes.price}>Rp {product?.price}</div>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

Shop.propTypes = {
  products: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  products: selectProducts,
});

export default connect(mapStateToProps)(Shop);
