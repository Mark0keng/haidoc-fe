import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import classes from './style.module.scss';
import { MedicationLiquid, ThreeP } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.layout}>
      <div className={classes.banner}>
        <div className={classes.title}>Solusi Sehat Terpercaya</div>
        <div className={classes.subtitle}>Chat dokter dan beli obat bisa di haidoc!</div>

        <div className={classes.service}>
          <div className={classes.card} onClick={() => navigate('/doctor')}>
            <ThreeP />
            <div className={classes.name}>Chat Dokter</div>
          </div>
          <div className={classes.card} onClick={() => navigate('/shop')}>
            <MedicationLiquid />
            <div className={classes.name}>Beli Obat</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
