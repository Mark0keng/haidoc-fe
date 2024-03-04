import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createChatOrder, getUserChatOrder, updateChatOrder } from './actions';
import { getPayment } from '@pages/Order/actions';

import classes from './style.module.scss';
import { createChat } from '@pages/Chat/actions';

const ChatOrder = () => {
  const { orderId } = useParams();
  const [chatOrder, setChatOrder] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      getUserChatOrder({ orderId }, (chatOrderData) => {
        setChatOrder(chatOrderData[0]);
      })
    );
  }, [dispatch]);

  function getUID() {
    return Date.now().toString(36);
  }

  const handlePayment = () => {
    dispatch(
      getPayment({ orderId, category: 'chat' }, (token) => {
        snap.pay(token, {
          onSuccess: function (result) {
            dispatch(
              updateChatOrder(
                {
                  orderId: chatOrder?.orderId,
                  grossAmount: chatOrder?.grossAmount,
                  chatCost: chatOrder?.chatCost,
                  serviceCost: chatOrder?.serviceCost,
                  doctorId: chatOrder?.doctorId,
                  clientId: chatOrder?.clientId,
                  status: 'success',
                },
                chatOrder?.id,
                () => {
                  dispatch(
                    createChat(
                      {
                        roomId: getUID(),
                        doctorId: chatOrder?.doctorId,
                        clientId: chatOrder?.clientId,
                      },
                      (chatData) => {
                        navigate(`/chat/${chatData?.roomId}`);
                      }
                    )
                  );
                }
              )
            );
          },
          onPending: function (result) {},
          onError: function (result) {
            dispatch(
              updateChatOrder(
                {
                  orderId: chatOrder?.orderId,
                  grossAmount: chatOrder?.grossAmount,
                  chatCost: chatOrder?.chatCost,
                  serviceCost: chatOrder?.serviceCost,
                  doctorId: chatOrder?.doctorId,
                  clientId: chatOrder?.clientId,
                  status: 'failed',
                },
                chatOrder?.id,
                () => {
                  dispatch(
                    getUserChatOrder({ orderId }, (chatOrderData) => {
                      setChatOrder(chatOrderData[0]);
                    })
                  );
                }
              )
            );
          },
        });
      })
    );
  };

  return (
    <div className={classes.layout}>
      <div className={classes.header}>
        <div className={classes.text}>Ringkasan Pembayaran</div>
      </div>

      <div className={classes.patient}>
        <div className={classes.label}>Nama Pasien :</div>
        <div className={classes.name}>{chatOrder?.client?.username}</div>
      </div>

      <div className={classes.doctor}>
        <div className={classes.imageSection}>
          <img src={chatOrder?.doctor?.imageUrl} className={classes.image} />
        </div>
        <div className={classes.info}>
          <div className={classes.name}>{chatOrder?.doctor?.fullName}</div>
          <div className={classes.specialist}>{chatOrder?.doctor?.specialist}</div>
        </div>
      </div>

      <div className={classes.bill}>
        <div className={classes.item}>
          <div className={classes.label}>Biaya sesi chat</div>
          <div className={classes.price}>Rp {chatOrder?.chatCost}</div>
        </div>
        <div className={classes.item}>
          <div className={classes.label}>Biaya layanan</div>
          <div className={classes.price}>Rp {chatOrder?.serviceCost}</div>
        </div>
        <div className={classes.total}>
          <div>Pembayaranmu</div>
          <div>Rp {chatOrder?.grossAmount}</div>
        </div>
      </div>

      <div className={classes.pay}>
        {chatOrder?.status === 'pending' && (
          <div className={classes.button} onClick={handlePayment}>
            Bayar
          </div>
        )}
        {chatOrder?.status === 'success' && <div className={classes.buttonDisable}>Pembayaran Sukses</div>}
      </div>
    </div>
  );
};

export default ChatOrder;
