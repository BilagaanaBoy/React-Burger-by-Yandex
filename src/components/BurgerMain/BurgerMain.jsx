
import React from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './BurgerMain.module.css';
//import clsx from 'clsx';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
//import { ingredientsType } from '../../utils/propTypesConst';


function BurgerMain(props) {
  return (
    <main className={styles.main}>
       <DndProvider backend={HTML5Backend}>
        <section className="mr-10">
          <h1 className={'text text_type_main-large mt-10 mb-5'} >
            Соберите бургер
          </h1>
          <BurgerIngredients setModalOpen={props.setModalOpen}/>
        </section>
        <section>
          <BurgerConstructor  setModalOpen={props.setModalOpen}/>
        </section>
      </DndProvider>
    </main>
  );
}

export default BurgerMain;

BurgerMain.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
};