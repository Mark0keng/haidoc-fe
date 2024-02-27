import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Avatar, AvatarGroup } from '@mui/material';

import { selectToken } from '@containers/Client/selectors';
import { createMessage, getChat, getMessage } from './actions';
import { getTime } from '@utils/formatTime';

import classes from './style.module.scss';

const Chat = ({ token }) => {
  const socket = io.connect('http://localhost:5000');

  const { roomId } = useParams();
  const [me, setMe] = useState('');
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setMe(jwtDecode(token));
  }, []);

  useEffect(() => {
    me &&
      dispatch(
        getChat({ roomId }, (chatData) => {
          if (chatData.length > 0) {
            if (me?.id === chatData[0]?.doctorId || me?.id === chatData[0]?.clientId) {
              socket.emit('join_room', roomId);

              dispatch(
                getMessage({ roomId }, (messageData) => {
                  setMessageList(messageData);
                })
              );
            } else {
              navigate('/not-authorized');
            }
          } else {
            navigate('/not-found');
          }
        })
      );
  }, [dispatch, me]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const sendMessage = () => {
    const payload = {
      roomId,
      senderId: me?.id,
      message,
      time: new Date(Date.now()),
    };

    dispatch(
      createMessage(payload, () => {
        socket.emit('send_message', payload);
        setMessage('');
      })
    );
  };

  return (
    <div className={classes.layout}>
      <div className={classes.header}>
        <AvatarGroup max={2}>
          <Avatar />
          <Avatar />
        </AvatarGroup>
      </div>
      <div className={classes.content}>
        {messageList?.map((messageData, index) => (
          <div className={me?.id === messageData?.senderId ? classes.yourMessage : classes.otherMessage} key={index}>
            <div className={classes.bubbleChat}>
              <div className={classes.text}>{messageData?.message}</div>
              <div className={classes.time}>{getTime(messageData?.time)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={classes.texter}>
        <input type="text" className={classes.input} value={message} onChange={(e) => setMessage(e.target.value)} />
        <div className={classes.send} onClick={sendMessage}>
          Kirim
        </div>
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
