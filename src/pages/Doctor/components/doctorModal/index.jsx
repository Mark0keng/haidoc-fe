import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@mui/material';
import { BadgeRounded, SchoolRounded } from '@mui/icons-material';

import { createChatOrder } from '@pages/ChatOrder/actions';

import classes from './style.module.scss';

const DoctorModal = ({ doctor, isOpen, onClose }) => {
  const serviceCost = 2000;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const payload = {
      grossAmount: doctor?.cost + serviceCost,
      chatCost: doctor?.cost,
      serviceCost: serviceCost,
      doctorId: doctor?.userId,
    };
    dispatch(
      createChatOrder(payload, (chatOrderData) => {
        navigate(`/chat-order/${chatOrderData?.orderId}`);
      })
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <div className={classes.layout}>
        <div className={classes.imageSection}>
          <img src={doctor?.imageUrl} className={classes.image}></img>
        </div>

        <div className={classes.infoSection}>
          <div className={classes.name}>{doctor?.fullName}</div>
          <div className={classes.specialist}>{doctor?.specialist}</div>
          <div className={classes.experience}>{doctor?.experience} tahun</div>
        </div>
        <div className={classes.priceSection}>
          <div className={classes.price}>Rp {doctor?.cost}</div>
          <div className={classes.service}>+ Biaya layanan : Rp {serviceCost}</div>
        </div>
        <div className={classes.moreInfoSection}>
          <div className={classes.alumnus}>
            <div className={classes.header}>
              <SchoolRounded />
              <div>Alumnus</div>
            </div>
            <div className={classes.text}>{doctor?.alumnus}</div>
          </div>

          <div className={classes.str}>
            <div className={classes.header}>
              <BadgeRounded />
              <div>Nomor STR</div>
            </div>
            <div className={classes.text}>{doctor?.strId}</div>
          </div>
        </div>

        <div className={classes.order}>
          <div className={classes.button} onClick={handleSubmit}>
            Order Konsultasi (Rp {doctor?.cost + serviceCost})
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DoctorModal;
