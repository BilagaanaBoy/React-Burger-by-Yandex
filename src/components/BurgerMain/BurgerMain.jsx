
import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerMain.module.css';
import clsx from 'clsx';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { ingredientsType } from '../../utils/propTypesConst';


function BurgerMain(props) {
  console.log(props);
  return (
    <main className={styles.main}>
      <section className="mr-10">
        <h1 className={'text text_type_main-large mt-10 mb-5'} >
          Соберите бургер
        </h1>
        <BurgerIngredients data={props.data} setModalOpen={props.setModalOpen}/>
      </section>
      <section>
        <BurgerConstructor data={props.data} setModalOpen={props.setModalOpen}/>
      </section>
    </main>
  );

}

export default BurgerMain;

BurgerMain.propTypes = {
  data: PropTypes.arrayOf(ingredientsType).isRequired,
  setModalOpen: PropTypes.func.isRequired,
};