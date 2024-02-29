import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Avatar } from '@mui/material';

import { selectToken } from '@containers/Client/selectors';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';

import { getChat } from '@pages/Chat/actions';
import { getDiffTime } from '@utils/formatTime';

import classes from './style.module.scss';

const ChatList = ({ token }) => {
  const socket = io.connect('http://localhost:5000');

  const { id } = useParams();
  const [me, setMe] = useState('');
  const [chatList, setChatList] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setMe(jwtDecode(token));
  }, []);

  useEffect(() => {
    if (me) {
      me?.id !== Number(id) && navigate('/unauthorized');

      dispatch(
        getChat({ doctorId: id }, (chatData) => {
          setChatList(chatData);
        })
      );
    }
  }, [dispatch, me]);

  useEffect(() => {
    socket.on('send_message', (data) => {
      console.log('hallo');

      dispatch(
        getChat({ doctorId: id }, (chatData) => {
          setChatList(chatData);
        })
      );
    });
  }, [socket]);

  return (
    <div className={classes.layout}>
      <div className={classes.header}>
        <div className={classes.title}>Chat List</div>
      </div>
      <div className={classes.chatList}>
        {chatList &&
          chatList
            ?.sort((a, b) => new Date(b?.latestMessage[0].time) - new Date(a?.latestMessage[0]?.time))
            .map((chat, index) => (
              <div className={classes.chat} key={index} onClick={() => navigate(`/chat/${chat?.roomId}`)}>
                <Avatar>{chat?.client?.username[0].toUpperCase()}</Avatar>
                <div className={classes.info}>
                  <div className={classes.nameTime}>
                    <div className={classes.name}>{chat?.client?.username}</div>
                    <div className={classes.time}>{getDiffTime(chat?.latestMessage[0]?.time)}</div>
                  </div>
                  <div className={classes.lastMessage}>{chat?.latestMessage[0]?.message}</div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

ChatList.propTypes = {
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(ChatList);
