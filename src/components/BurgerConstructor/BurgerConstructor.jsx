import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './BurgerConstructor.module.css';
import { CurrencyIcon, ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderDetails from '../OrderDetails/OrderDetails';
import { ingredientsType } from '../../utils/propTypesConst';

function BurgerConstructor(props) {

  const bun = props.data.find((item) => item.type === 'bun');

  const getOrderModal = () => {
    const modalContent = <OrderDetails order={'123456'} />;
    const modalHeader = ' ';
    props.setModalOpen(modalContent, modalHeader);
  }

  return (
    <div className="mt-25 ml-4">
      {bun && (
        <section>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + ' (верх)'}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </section>
      )}
      <section className={clsx(styles.contentList, ' mt-6 mb-6 pr-4')}>
        {props.data.map((item) => (
        item.type != 'bun' && (
          <div className={styles.flex} key={item._id}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
            />
          </div>
          )
        ))}
      </section>
      {bun && (
        <section>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + ' (низ)'}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </section>
      )}
      <div className={clsx(styles.shop, '  mt-10')}>
        <div className="mr-10">
          <p className={clsx(styles.totalPrice, 'text text_type_digits-medium  mr-2')}>
            1399
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium" onClick={getOrderModal}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );

}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientsType).isRequired,
  setModalOpen: PropTypes.func.isRequired,
};