import React,{FunctionComponent,ReactNode} from 'react';
import { useDrop } from 'react-dnd';
import { useHistory } from 'react-router-dom';

import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './BurgerConstructor.module.css';
import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientConstructor from '../IngredientConstructor/IngredientConstructor';
import { TItem } from '../../utils/types';
import { useSelector, useDispatch } from '../../utils/hooks';
import {
  ADD_INGREDIENT,
  CHANGE_INGREDIENT,
  DELETE_INGREDIENT,
} from '../../services/actions';
import { postOrder } from '../../services/actions/mainAction';

interface IBurgerConstructorProps {
  setModalOpen: (modalChild: ReactNode, modalHeader: string) => void;
}

const  BurgerConstructor: FunctionComponent<IBurgerConstructorProps> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const data = useSelector((store) => store.mainReducer.constructor);
  const bun = data.find((item) => item.type === 'bun');

  const auth = useSelector((store) => store.authReducer.isAuthorized);

  React.useEffect(() => {
    setTotal();
  }, [data]);
  

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: TItem) {
      const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      let qnt = 1;
      let selectedBun = data.find((el: TItem) => el.type === 'bun');
      if (item.type === 'bun'){
        qnt++;
        if (selectedBun) {
          dispatch({
            type: DELETE_INGREDIENT,
            item: selectedBun,
            qnt: qnt,
          });
        }
      }
      dispatch({
        type: ADD_INGREDIENT,
        item: item,
        id: uniqueId,
        qnt: qnt,
      });
    }
  });

  const [totaPrice, setTotal] = React.useReducer(reducer, { total: 0 });
  
  function reducer() {
    const total = data.reduce( (sum: number, item: TItem) => sum + (item.type === 'bun' ? item.price * 2 : item.price),0);
    return { total: total };
  }

  const getOrderModal = () => {
    if (auth) {
      dispatch(postOrder(data));
      const modalContent = <OrderDetails />;
      const modalHeader = '';
      props.setModalOpen(modalContent, modalHeader);
    } else {
      history.replace({ pathname: '/login' });
    }
  }

  const dragElement = (dragIndex: number, hoverIndex: number) => {
    dispatch({
      type: CHANGE_INGREDIENT,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  }
  

  const inactiveButtonStyle = bun ? {} : { opacity: 0.5, cursor: 'default' };

  return (
    <div ref={dropTarget} className="burger-constructor mt-25 ml-4">
      {bun ? (
        <section>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + ' (верх)'}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </section>
      ) : (
        <div className={clsx(styles.noIngredient, styles.noBunsTop, 'text')} >
          <p>Выберите булку</p>
        </div>
      )}
      <section className={clsx(styles.contentList, ' mt-6 mb-6 pr-4')}>
        {data.map((elem: TItem, index: number) => (
        elem.type !== 'bun' && (
             <IngredientConstructor
                item={elem}
                index={index}
                key={elem.uniqueId}
                dragElement={dragElement}
              />
          )
        ))}
      </section>

      {bun ? (
        <section>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + ' (низ)'}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </section>
      ) : (
        <div className={clsx(styles.noIngredient, styles.noBunsBottom, 'text')} >
          <p>Выберите булку</p>
        </div>
      )}
      <div className={clsx(styles.shop, '  mt-10')}>
        <div className="mr-10">
          <p className={clsx(styles.totalPrice, 'text text_type_digits-medium  mr-2')}>
            {totaPrice.total}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        {bun && (
        /* @ts-ignore */
        <Button type="primary" size="medium"  style={inactiveButtonStyle} onClick = { getOrderModal} >
          Оформить заказ
        </Button>
        )}
      </div>
    </div>
  );

}

export default BurgerConstructor;