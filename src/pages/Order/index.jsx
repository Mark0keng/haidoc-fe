import classes from './style.module.scss';

const Order = () => {
  return (
    <div className={classes.layout}>
      <div className={classes.card}>
        <div className={classes.header}>Tagihan</div>

        <div className={classes.itemSection}>
          <div className={classes.title}>List Pembelian</div>
          <div className={classes.item}>
            <div className={classes.name}>Actifed 100Gr</div>
            <div className={classes.quantity}>x3</div>

            <div className={classes.price}>Rp 100000</div>
          </div>
        </div>

        <div className={classes.billSection}>
          <div className={classes.title}>Pembayaranmu</div>
          <div className={classes.bill}>Rp 100000</div>
        </div>

        <div className={classes.pay}>Bayar</div>
      </div>
    </div>
  );
};

export default Order;
