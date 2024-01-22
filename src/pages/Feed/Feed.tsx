import React, { FC, ReactNode, useEffect } from 'react';
import styles from './Feed.module.css';
import clsx from 'clsx';

import { useDispatch, useSelector } from '../../utils/hooks';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
} from '../../services/actions';
import { wsApiOrderURL } from '../../utils/urlConst';

import FeedContent from '../../components/FeedContent/FeedContent';
import OrdersList from '../../components/OrdersList/OrdersList';

interface IFeedProps {
  setModalOpen: (modalChild: ReactNode, modalHeader: string) => void;
}

const Feed: FC<IFeedProps> = ({ setModalOpen }) => {
  const recivedData = useSelector((store) => store.wsReducer.messages);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: wsApiOrderURL,
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSE,
      });
    };
  }, [dispatch]);

  return (
    <div className={styles.main}>
      <div className={clsx(styles.feed,' mr-10')}>
        <h1 className={clsx(styles.label,'text text_type_main-large mt-10 mb-5')}>
          Лента заказов
        </h1>
        <FeedContent
          setModalOpen={setModalOpen}
          recivedData={recivedData}
          path={'/feed/'}
        />
      </div>
      <OrdersList setModalOpen={setModalOpen} recivedData={recivedData} />
    </div>
  );
};

export default Feed;