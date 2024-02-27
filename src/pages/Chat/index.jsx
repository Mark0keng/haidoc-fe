import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Avatar, AvatarGroup } from '@mui/material';

import { selectToken } from '@containers/Client/selectors';

import classes from './style.module.scss';
import { getChat } from './actions';

const socket = io.connect('http://localhost:5000');

const Chat = ({ token }) => {
  const { roomId } = useParams();
  const [me, setMe] = useState('');
  const [message, setMessage] = useState('');
  const [currentMessages, setCurrentMessages] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getChat({ roomId }, (chatData) => {
        if (chatData.length > 0) {
          if (me?.id !== chatData?.doctorId || me?.id !== chatData?.clientId) {
            navigate('/not-authorized');
          }

          setMe(jwtDecode(token));
          socket.emit('join_room', roomId);
        } else {
          navigate('/not-found');
        }
      })
    );
  }, [dispatch, roomId]);

  const sendMessage = async () => {
    const payload = {
      roomId,
      senderId: me?.id,
      message,
      time: new Date(Date.now()).getHours() + ' : ' + new Date(Date.now()).getMinutes(),
    };

    await socket.emit('send_message', payload);
  };

  return (
    <div className={classes.layout}>
      <div className={classes.header}>
        <AvatarGroup max={2}>
          <Avatar />
          <Avatar />
        </AvatarGroup>
      </div>
      <div className={classes.content}></div>

      <div className={classes.texter}>
        <input type="text" className={classes.input} />
        <div className={classes.send}>Kirim</div>
      </div>
    </div>
  );
};

Chat.propTypes = {
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(Chat);
