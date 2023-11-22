import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredients.module.css';
import Ingredient from '../Ingredient/Ingredient';
//import { ingredientsType } from '../../utils/propTypesConst';

function BurgerIngredients(props) {
  const data = useSelector((store) => store.mainReducer.ingredients);
  const [section, setSection] = React.useState('bread');

  const handleScroll = () => {
    let ingredients = document.querySelector('#ingredients');
    const toBread = Math.abs(
      ingredients.getBoundingClientRect().top -
      document.querySelector('#bread').getBoundingClientRect().top
    );
    const toSauce = Math.abs(
      ingredients.getBoundingClientRect().top -
      document.querySelector('#sauce').getBoundingClientRect().top
    );
    const toTopping = Math.abs(
      ingredients.getBoundingClientRect().top -
      document.querySelector('#topping').getBoundingClientRect().top
    );
    setSection(
      toBread === Math.min(toBread, toSauce, toTopping) ? 'bread'
        : toSauce === Math.min(toBread, toSauce, toTopping) ? 'sauce'
        : 'topping'
    );
  };

  const scrollToTab = (value) => {
    setSection(value);
    const element = document.querySelector(`#${value}`);
    element.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }

  return (
    <section className={styles.main}>
      <div className={styles.flex}>
        <Tab value="bread" active={section === 'bread'} onClick={() => scrollToTab('bread')}>
          Булки
        </Tab>
        <Tab value="sauce" active={section === 'sauce'} onClick={() => scrollToTab('sauce')}>
          Соусы
        </Tab>
        <Tab value="topping" active={section === 'topping'} onClick={() => scrollToTab('topping')}>
          Начинки
        </Tab>
      </div>
      <section className={styles.content} id="ingredients" onScroll={handleScroll}> 
        <p id='bread' className={clsx(styles.sectionLabel, 'text text_type_main-medium mt-10')}>
          Булки
        </p>
        <div className={clsx(styles.sectionContent, ' mt-6 ml-4 mr-2')}>
          {data.filter((item) => item.type === 'bun').map((item) => (
            <Ingredient item={item} key={item._id} setModalOpen={props.setModalOpen} />
          ))}
        </div>
        <p id='sauce' className={clsx(styles.sectionLabel, 'text text_type_main-medium mt-10 ')}>
          Соусы
        </p>
        <div className={styles.sectionContent + ' mt-6 ml-4 mr-2'}>
          {data.filter((item) => item.type === 'sauce').map((item) => (
            <Ingredient item={item} key={item._id} setModalOpen={props.setModalOpen} />
          ))}
        </div>
        <p id='topping' className={clsx(styles.sectionLabel, 'text text_type_main-medium mt-10')}>
          Начинки
        </p>
        <div className={`${styles.sectionContent} mt-6 ml-4 mr-2`}>
          {data.filter((item) => item.type === 'main').map((item) => (
            <Ingredient item={item} key={item._id} setModalOpen={props.setModalOpen} />
          ))}
        </div>
      </section>
    </section>
  );

}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
};