import { Grid } from '@mui/material';
import classes from './style.module.scss';

const Shop = () => {
  return (
    <div>
      <div className={classes.banner}>
        <div className={classes.content}>
          <div className={classes.title}>Haidoc Shop</div>
          <div className={classes.subTitle}>Solusi sehat terpercaya</div>

          <div className={classes.search}>
            <input type="text" className={classes.input} />
            <div className={classes.button}>Search</div>
          </div>
        </div>
      </div>

      <div className={classes.shopSection}>
        <div className={classes.layout}>
          <div className={classes.filter}></div>
          <div className={classes.catalogue}>
            <Grid container spacing={2}></Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
