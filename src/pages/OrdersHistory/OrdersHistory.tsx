import React, { FC, useEffect, MouseEvent, ReactNode } from 'react';
import styles from './OrdersHistory.module.css';
import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from '../../utils/hooks';
import { logout } from '../../services/actions/authActions';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,

} from '../../services/actions';

import { wsUserApiOrderURL } from '../../utils/urlConst';
import { getCookie } from '../../services/actions/authActions';
import FeedContent from '../../components/FeedContent/FeedContent';

interface IOrdersHistoryProps {
  setModalOpen: (modalChild: ReactNode, modalHeader: string) => void;
}

const OrdersHistory: FC<IOrdersHistoryProps> = ({ setModalOpen }) => {
  const dispatch = useDispatch();
  const recivedData = useSelector((store) => store.wsReducer.messages);

  function onExit(e: MouseEvent) {
    dispatch(logout());
  }
  useEffect(() => {
    const accessToken = getCookie('accessToken').replace('Bearer ', '');
    dispatch({
      type: WS_CONNECTION_START,
      payload: `${wsUserApiOrderURL}?token=${accessToken}`,
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSE,
      });
    };
  }, [dispatch]);

  return (
    <div className={styles.main}>
      <div className={styles.nav + ' mr-15'}>
        <Link
          to={{ pathname: '/profile' }}
          className={clsx(styles.link,' text text_type_main-medium')}
        >
          Профиль
        </Link>
        <Link
          to={{ pathname: '/profile/orders' }}
          className={clsx(styles.activeLink,' text text_type_main-medium')}
        >
          История заказов
        </Link>
        <div
          className={clsx(styles.exitLink,' text text_type_main-medium')}
          onClick={onExit}
        >
          Выход
        </div>
        <p className={clsx(styles.text, ' text text_type_main-default mt-20')}>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>
      <div className={styles.form + ' mb-20'}>
        <FeedContent
          setModalOpen={setModalOpen}
          recivedData={recivedData}
          path={'/profile/orders/'}
        />
      </div>
    </div>
  );
};

export default OrdersHistory;