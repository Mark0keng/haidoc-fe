import classes from './style.module.scss';

const Address = () => {
  return (
    <div className={classes.layout}>
      <div className={classes.title}>Masukkan Alamat Anda</div>
      <div className={classes.inputSection}>
        <div>
          <label className={classes.label}>Provinsi</label>
          <input type="text" className={classes.input} />
        </div>
        <div>
          <label className={classes.label}>Kota</label>
          <input type="text" className={classes.input} />
        </div>
        <div>
          <label className={classes.label}>Alamat Lengkap</label>
          <input type="text" className={classes.input} />
        </div>
      </div>
    </div>
  );
};

export default Address;
