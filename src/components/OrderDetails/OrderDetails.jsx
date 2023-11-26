import { useSelector } from 'react-redux';
import doneLogo from '../../images/done.svg';

import styles from './OrderDetails.module.css';
import clsx from 'clsx';

function OrderDetails(props) {
  const order = useSelector((store) => store.mainReducer.order);
  return (
    <div className={styles.main}>
      <p className={clsx(styles.order,' text text_type_digits-large')}>
        {order}
      </p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <section className={'mt-15'}>
        <img src={doneLogo} alt={doneLogo} />
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
