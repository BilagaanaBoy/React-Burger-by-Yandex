import { useSelector } from 'react-redux';
import styles from './OrderDetails.module.css';
import clsx from 'clsx';

import doneImg from '../../images/done.svg';

function OrderDetails() {
  const order = useSelector((store) => store.reducerOrder.order);

  return (
    <div className={styles.main}>
      <p className={clsx(styles.order,' text text_type_digits-large')}>
        {order}
      </p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>

      <section className={'mt-15'}>
        <img  src={doneImg} alt="done" />
      </section>
      
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p className={'text text_type_main-default text_color_inactive mt-2 mb-30'}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;

