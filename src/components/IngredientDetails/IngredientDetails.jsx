import React from 'react';
import clsx from 'clsx';

import styles from './IngredientDetails.module.css';
import { ingredientsType } from '../../utils/propTypesConst';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function IngredientDetails(props) {

  return (
    <div className={styles.main}>
      <section className={styles.textColor}>
        <img src={props.item.image_large} alt={props.item.name} className="ml-5 mr-5" />
        <p className={'text text_type_main-medium mt-4'}>
          {props.item.name}
        </p>
      </section>
      <section className={clsx(styles.detailsList,' mt-8 mb-15')}>
        <span className={clsx(styles.detail,' text_color_inactive mr-5')}>
          <p className="text text_type_main-default">Калории, ккал</p>
          <p className="text text_type_digits-default">{props.item.calories}</p>
        </span>
        <span className={clsx(styles.detail,' text_color_inactive mr-5')}>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{props.item.proteins}</p>
        </span>
        <span className={clsx(styles.detail,'text_color_inactive mr-5')}>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{props.item.fat}</p>
        </span>
        <span className={clsx(styles.detail,'text_color_inactive')}>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">{props.item.carbohydrates}</p>
        </span>
      </section>
    </div>
  );
}

export default IngredientDetails;

IngredientDetails.propTypes = {
  item: ingredientsType.isRequired,
};