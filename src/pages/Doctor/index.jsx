import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { io } from 'socket.io-client';
import { Grid, InputAdornment, OutlinedInput } from '@mui/material';
import { Search, WorkHistoryRounded } from '@mui/icons-material';

import { getDoctor } from './actions';
import { createChat, getChat } from '@pages/Chat/actions';
import { selectToken } from '@containers/Client/selectors';

import classes from './style.module.scss';
import DoctorModal from './components/doctorModal';

const socket = io.connect('http://localhost:5000');

const Doctor = ({ token }) => {
  const [me, setMe] = useState('');
  const [doctor, setDoctor] = useState('');
  const [doctors, setDoctors] = useState('');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getDoctor({}, (doctorData) => {
        setDoctors(doctorData);
        setMe(jwtDecode(token));
      })
    );
  }, [dispatch]);

  function getUID() {
    return Date.now().toString(36);
  }

  const enterChat = (doctorId) => {
    const payload = {
      roomId: getUID(),
      doctorId: doctorId,
      clientId: me?.id,
    };
    dispatch(
      getChat({ doctorId, clientId: me?.id }, (chatData) => {
        if (chatData.length > 0) {
          navigate(`/chat/${chatData[0]?.roomId}`);
        } else {
          dispatch(
            createChat(payload, (chatData) => {
              navigate(`/chat/${chatData?.roomId}`);
            })
          );
        }
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(
      getDoctor({ fullName: search }, (doctorData) => {
        setDoctors(doctorData);
      })
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={classes.layout}>
      <div className={classes.title}>Cari Dokter</div>

      <div className={classes.search}>
        <form onSubmit={handleSearch}>
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            size="small"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={handleSearch}
          />
        </form>
      </div>

      <div className={classes.doctorSection}>
        <div></div>
        <div className={classes.listDoctor}>
          <Grid container spacing={3}>
            {doctors &&
              doctors?.map((doctor, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
                  <div className={classes.card}>
                    <div className={classes.imageSection}>
                      <img src={doctor?.imageUrl} alt="doctor-img" className={classes.image} />
                    </div>
                    <div className={classes.infoSection}>
                      <div className={classes.name}>{doctor?.fullName}</div>
                      <div className={classes.specialist}>{doctor?.specialist}</div>
                      <div className={classes.experience}>
                        <WorkHistoryRounded style={{ fontSize: 14, marginRight: 8 }} />
                        <div className={classes.text}>{doctor?.experience} tahun</div>
                      </div>
                      <div className={classes.action}>
                        <div className={classes.cost}>Rp {doctor?.cost}</div>
                        {me?.role === 1 && (
                          <div
                            className={classes.chat}
                            onClick={() => {
                              setDoctor(doctor);
                              handleOpenModal();
                            }}
                          >
                            Chat
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
      <DoctorModal
        doctor={doctor}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

Doctor.propTypes = {
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(Doctor);
