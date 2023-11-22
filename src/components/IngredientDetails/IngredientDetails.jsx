import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import clsx from 'clsx';

import styles from './IngredientDetails.module.css';

function IngredientDetails(props) {
  let { id } = useParams();
  const items = useSelector((store) => store.mainReducer.ingredients);
  const item = items.find((el) => el._id === id);

  
  return (
    <div className={styles.main}>
      <section className={styles.textColor}>
        <img src={item.image_large} alt="No image" className="ml-5 mr-5" />
        <p className={'text text_type_main-medium mt-4'}>
          {item.name}
        </p>
        <p className={'text text_type_main-small mt-4'} >
          {item.description}
          {/* в макете есть описание, но в api его нет */}
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
