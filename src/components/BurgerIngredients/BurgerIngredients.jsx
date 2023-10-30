import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredients.module.css';
import Ingredient from '../Ingredient/Ingredient';
import { ingredientsType } from '../../utils/propTypesConst';

function BurgerIngredients(props) {

  const [section, setSection] = React.useState('bread');
  return (
    <section className={styles.main}>
      <div className={styles.flex}>
        <Tab value="bread" active={section === 'bread'} onClick={() => setSection('bread')}>
          Булки
        </Tab>
        <Tab value="sauce" active={section === 'sauce'} onClick={() => setSection('sauce')}>
          Соусы
        </Tab>
        <Tab value="topping" active={section === 'topping'} onClick={() => setSection('topping')}>
          Начинки
        </Tab>
      </div>
      <section className={styles.content}>
        <p className={clsx(styles.sectionLabel, 'text text_type_main-medium mt-10')}>
          Булки
        </p>
        <div className={clsx(styles.sectionContent, ' mt-6 ml-4 mr-2')}>
          {props.data.filter((item) => item.type === 'bun').map((item) => (
            <Ingredient item={item} key={item._id} setModalOpen={props.setModalOpen} />
          ))}
        </div>
        <p className={clsx(styles.sectionLabel, 'text text_type_main-medium mt-10 ')}>
          Соусы
        </p>
        <div className={styles.sectionContent + ' mt-6 ml-4 mr-2'}>
          {props.data.filter((item) => item.type === 'sauce').map((item) => (
            <Ingredient item={item} key={item._id} setModalOpen={props.setModalOpen} />
          ))}
        </div>
        <p className={clsx(styles.sectionLabel, 'text text_type_main-medium mt-10')}>
          Начинки
        </p>
        <div className={`${styles.sectionContent} mt-6 ml-4 mr-2`}>
          {props.data.filter((item) => item.type === 'main').map((item) => (
            <Ingredient item={item} key={item._id} setModalOpen={props.setModalOpen} />
          ))}
        </div>
      </section>
    </section>
  );

}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientsType).isRequired,
  setModalOpen: PropTypes.func.isRequired,
};