
import {FunctionComponent, ReactNode}  from 'react';
import { useDrag } from 'react-dnd';
import { useHistory, useLocation } from 'react-router-dom';

import clsx from 'clsx';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Ingredient.module.css';

import { TItem } from '../../utils/types';

interface IIngredientProps {
  item: TItem;
  setModalOpen: (modalChild: ReactNode, modalHeader: string) => void;
}

const Ingredient: FunctionComponent<IIngredientProps> = (props) => {

  const history = useHistory();
  let location = useLocation();


  const getIngredientModal = () => {
    history.push({
      pathname: `/ingredients/${props.item._id}`,
      state: { background: location },
    });
  }

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item:  props.item,
  });

  return (
    <div ref={dragRef} className={styles.content} onClick={getIngredientModal}>
      <img src={props.item.image} alt="No image" className={styles.image} />
      <div className={clsx(styles.flex, ' mt-1 ')}>
        <p className="text text_type_digits-default mr-2 ">{props.item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default mt-1">{props.item.name}</p>
      <div >
      {props.item.count > 0 && <Counter count={ props.item.count} size="default" />}
      </div>
    </div>
  );

}


export default Ingredient;
