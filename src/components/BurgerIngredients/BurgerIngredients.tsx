import React, {FunctionComponent,ReactNode} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredients.module.css';
import Ingredient from '../Ingredient/Ingredient';
import { TItem } from '../../utils/types';
import { useSelector } from '../../utils/hooks';
interface IBurgerIngredientsProps {
  setModalOpen: (modalChild: ReactNode, modalHeader: string) => void;
}


const BurgerIngredients: FunctionComponent<IBurgerIngredientsProps> = (props) => {
  const data = useSelector((store) => store.mainReducer.ingredients);
  const [section, setSection] = React.useState('bread');

  const ingredientsWindow = document.querySelector('#ingredients');
  const breadElement = document.querySelector('#bread');
  const sauceElement = document.querySelector('#sauce');
  const toppingElement = document.querySelector('#topping');

  const handleScroll = () => {
    let ingredients = document.querySelector('#ingredients');
    if (!ingredientsWindow || !breadElement || !sauceElement || !toppingElement) {
      setSection('bun');
      return;
    }
    const toBread = Math.abs(
      ingredientsWindow.getBoundingClientRect().top -
      breadElement.getBoundingClientRect().top
    );
    const toSauce = Math.abs(
      ingredientsWindow.getBoundingClientRect().top -
      sauceElement.getBoundingClientRect().top
    );
    const toTopping = Math.abs(
      ingredientsWindow.getBoundingClientRect().top -
      toppingElement.getBoundingClientRect().top
    );
    setSection(
      toBread === Math.min(toBread, toSauce, toTopping) ? 'bread'
        : toSauce === Math.min(toBread, toSauce, toTopping) ? 'sauce'
        : 'topping'
    );
  };

  const scrollToTab = (value:string) => {
    setSection(value);
    const element = document.querySelector(`#${value}`);
    if (!element) {
      return;
    }
    element.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }

  return (
    <section className={styles.main}>
      <div className={styles.flex}>
        {/* @ts-ignore */}
        <Tab value="bread" active={section === 'bread'} onClick={() => scrollToTab('bread')}>
          Булки
        </Tab>
        {/* @ts-ignore */}
        <Tab value="sauce" active={section === 'sauce'} onClick={() => scrollToTab('sauce')}>
          Соусы
        </Tab>
        {/* @ts-ignore */}
        <Tab value="topping" active={section === 'topping'} onClick={() => scrollToTab('topping')}>
          Начинки
        </Tab>
      </div>
      <section className={styles.content} id="ingredients" onScroll={handleScroll}> 
        <p id='bread' className={clsx(styles.sectionLabel, 'text text_type_main-medium mt-10')}>
          Булки
        </p>
        <div className={clsx(styles.sectionContent, ' mt-6 ml-4 mr-2')}>
          {data.filter((item: TItem) => item.type === 'bun').map((item: TItem) => (
            <Ingredient item={item} key={item._id} setModalOpen={props.setModalOpen} />
          ))}
        </div>
        <p id='sauce' className={clsx(styles.sectionLabel, 'text text_type_main-medium mt-10 ')}>
          Соусы
        </p>
        <div className={styles.sectionContent + ' mt-6 ml-4 mr-2'}>
          {data.filter((item: TItem) => item.type === 'sauce').map((item: TItem) => (
            <Ingredient item={item} key={item._id} setModalOpen={props.setModalOpen} />
          ))}
        </div>
        <p id='topping' className={clsx(styles.sectionLabel, 'text text_type_main-medium mt-10')}>
          Начинки
        </p>
        <div className={`${styles.sectionContent} mt-6 ml-4 mr-2`}>
          {data.filter((item: TItem) => item.type === 'main').map((item: TItem) => (
            <Ingredient item={item} key={item._id} setModalOpen={props.setModalOpen} />
          ))}
        </div>
      </section>
    </section>
  );

}

export default BurgerIngredients;
