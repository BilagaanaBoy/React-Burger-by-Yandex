import React from 'react';
import { useParams } from 'react-router-dom';

import clsx from 'clsx';
import styles from './IngredientDetails.module.css';

import { useSelector } from '../../utils/hooks';
import { TItem } from '../../utils/types';

function IngredientDetails() {
  let { id } = useParams<{id?: string}>();
  const items = useSelector((store) => store.mainReducer.ingredients);
  const item = items.find((el: TItem) => el._id === id);
  if (!item) {
    return <div></div>;
  }
  
  return (
    <div className={styles.main}>
      <section className={styles.textColor}>
        <h1 className={styles.label + ' text text_type_main-large'}>
          Детали ингредиента
        </h1>
        
        <img src={item.image_large} alt="No image" className="ml-5 mr-5" />
        <p className={'text text_type_main-medium mt-4'}>
          {item.name}
        </p>

      </section>
      <section className={clsx(styles.detailsList,' mt-8 mb-15')}>
        <span className={clsx(styles.detail,' text_color_inactive mr-5')}>
          <p className="text text_type_main-default">Калории, ккал</p>
          <p className="text text_type_digits-default">{item.calories}</p>
        </span>
        <span className={clsx(styles.detail,' text_color_inactive mr-5')}>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{item.proteins}</p>
        </span>
        <span className={clsx(styles.detail,'text_color_inactive mr-5')}>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{item.fat}</p>
        </span>
        <span className={clsx(styles.detail,'text_color_inactive')}>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">{item.carbohydrates}</p>
        </span>
      </section>
    </div>
  );
}

export default IngredientDetails;
