import React from 'react';
import { useMemo } from 'react';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';

import OrderDetails from '../OrderDetails/OrderDetails';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { CurrencyIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientConstructor from '../IngredientConstructor/IngredientConstructor';

// import { ADD_INGREDIENT, DELETE_INGREDIENT } from '../../services/actions/addDeleteAction';
import { ADD_INGREDIENT, DELETE_INGREDIENT, CHANGE_INGREDIENT} from '../../services/actions/changeAction';

import { postOrder } from '../../services/actions/postOrderAction';

function BurgerConstructor(props) {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.reducerIngredients.constructor);

  const { bun, ingredients } = useMemo(() => {
    return {
      bun: data.find(item => item.type === 'bun'),
      ingredients: data.filter(item => item.type !== 'bun'),
    };
  }, [data]);

  React.useEffect(() => {
    setTotal();
  }, [data]);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      let qnt = 1;

      if (item.type === 'bun'){
        if (bun){
          qnt++;
          dispatch({
            type: DELETE_INGREDIENT,
            item: bun,
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
  
  function reducer(state, action) {
    const total = data.reduce( (sum, item) => sum + (item.type === 'bun' ? item.price * 2 : item.price),0);
    return { total: total };
  }

  const getOrderModal = () => {
    const ingredientsIds = [bun._id,  ...ingredients.map(ingredient => ingredient._id), bun._id]
   
    dispatch(postOrder(ingredientsIds));
    const modalContent = <OrderDetails />;
    const modalHeader = '';
    props.setModalOpen(modalContent, modalHeader);
  }

  const dragElement = (dragIndex, hoverIndex) => {
    dispatch({
      type: CHANGE_INGREDIENT,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  }

  return (
    <div ref={dropTarget} className="mt-25 ml-4">
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
        {data.map((elem, index) => (
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
        <Button type="primary" size="medium"  style={bun ? {} : { opacity: 0.5, cursor: 'default' }} onClick = { getOrderModal } >
          Оформить заказ
        </Button>
        )}
      </div>
    </div>
  );

}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
};