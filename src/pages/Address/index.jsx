import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createAddress, getCity, getProvince } from './actions';

import classes from './style.module.scss';

const Address = () => {
  const [provinces, setProvinces] = useState('');
  const [cities, setCities] = useState('');
  const [provinceId, setProvinceId] = useState('');
  const [cityId, setCityId] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getProvince({}, (data) => {
        setProvinces(data);
      })
    );
  }, [dispatch]);

  const handleChangeProvince = (event) => {
    setCities([]);
    setProvinceId(event.target.value);
    setCityId('');

    if (event?.target?.value) {
      dispatch(
        getCity({ province: event.target.value }, (data) => {
          setCities(data);
        })
      );
    }
  };

  const handleSubmit = () => {
    const province = provinces && provinces?.filter((province) => province?.province_id === provinceId);
    const city = cities && cities?.filter((city) => city?.city_id === cityId);

    const payload = {
      provinceId,
      cityId,
      fullAddress: fullAddress + ' ' + city[0]?.city_name + ', ' + province[0]?.province,
    };

    dispatch(
      createAddress(
        payload,
        () => {
          navigate('/checkout/cart');
        },
        (err) => {
          setError(err.message);
        }
      )
    );
  };

  return (
    <div className={classes.layout}>
      <div className={classes.navigation}>
        <div className={classes.item}>Alamat</div>
        <hr className={classes.border} />
        <div className={classes.item}>Keranjang</div>
        <hr className={classes.border} />
        <div className={classes.item}>Pembayaran</div>
      </div>

      <div className={classes.card}>
        <div className={classes.title}>Masukkan Alamat Anda</div>

        {error && <div className={classes.error}>{error}</div>}

        <div className={classes.inputSection}>
          <div className={classes.formControl}>
            <label className={classes.label}>Provinsi</label>
            <select className={classes.select} onChange={handleChangeProvince}>
              <option value="">--Pilih Provinsi--</option>
              {provinces &&
                provinces?.map((province, index) => (
                  <option value={province?.province_id} key={index}>
                    {province?.province}
                  </option>
                ))}
            </select>
          </div>
          <div className={classes.formControl}>
            <label className={classes.label}>Kota</label>
            <select
              className={classes.select}
              onChange={(e) => {
                setCityId(e.target.value);
              }}
            >
              <option value="">--Pilih Kota--</option>
              {cities &&
                cities?.map((city, index) => (
                  <option value={city?.city_id} key={index}>
                    {city?.city_name}
                  </option>
                ))}
            </select>
          </div>
          <div className={classes.formControl}>
            <label className={classes.label}>Alamat Lengkap</label>
            <input
              type="text"
              className={classes.input}
              value={fullAddress}
              onChange={(e) => {
                setFullAddress(e.target.value);
              }}
            />
          </div>

          <div className={classes.button} onClick={handleSubmit}>
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect()(Address);
