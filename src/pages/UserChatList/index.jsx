import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { getChat } from '@pages/Chat/actions';
import { selectToken } from '@containers/Client/selectors';

import classes from './style.module.scss';

const UserChatList = ({ token }) => {
  const [me, setMe] = useState('');
  const [chatList, setChatList] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setMe(jwtDecode(token));
  }, [token]);

  useEffect(() => {
    dispatch(
      getChat({ clientId: me?.id }, (chatData) => {
        setChatList(chatData);
      })
    );
  }, [dispatch]);

  return (
    <div className={classes.layout}>
      <div className={classes.content}>
        <div className={classes.title}>Riwayat Konsultasi Online</div>
        <div>
          {chatList &&
            chatList?.map((chat) => (
              <div className={classes.card}>
                <div className={classes.id}>ID #{chat?.roomId}</div>

                <div className={classes.infoSection}>
                  <div className={classes.imageSection}>
                    <img src={chat?.doctor?.imageUrl} alt="" className={classes.image} />
                  </div>

                  <div className={classes.info}>
                    <div className={classes.name}>{chat?.doctor?.fullName}</div>
                    <div className={classes.specialist}>{chat?.doctor?.specialist}</div>
                    <div className={classes.chat} onClick={() => navigate(`/chat/${chat?.roomId}`)}>
                      Chat
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

UserChatList.propTypes = {
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(UserChatList);
