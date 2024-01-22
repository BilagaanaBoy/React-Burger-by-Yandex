import React, { FC, ReactNode } from 'react';
import styles from './FeedContent.module.css';
import clsx from 'clsx';

import { TOrders } from '../../utils/types';
import Order from '../Order/Order';

interface IFeedContentProps {
  setModalOpen: (modalChild: ReactNode, modalHeader: string) => void;
  recivedData: TOrders;
  path: string;
}

const FeedContent: FC<IFeedContentProps> = ({
  setModalOpen,
  recivedData,
  path,
}) => {
  return (
    <section>
      <div className={styles.orders}>
        <div className={clsx(styles.order,' mt-6')}>
          {recivedData.orders.map((item) => (
            <Order
              data={item}
              key={item._id}
              setModalOpen={setModalOpen}
              path={path}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedContent;