
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Ingredient.module.css';

import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { ingredientsType } from '../../utils/propTypesConst';

function Ingredient(props) {

  const getIngredientModal = () => {
    const modalContent = <IngredientDetails item={props.item} />;
    const modalHeader = 'Детали ингредиента';
    props.setModalOpen(modalContent, modalHeader);
  }

  return (
    <div className={styles.content} onClick={getIngredientModal}>
      <img src={props.item.image} alt="No image" className={styles.image} />
      <div className={clsx(styles.flex, ' mt-1 ')}>
        <p className="text text_type_digits-default mr-2 ">{props.item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default mt-1">{props.item.name}</p>
      <div >
        <Counter count={0} size="default" />
      </div>
    </div>
  );

}


export default Ingredient;

Ingredient.propTypes = {
  item: ingredientsType.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};