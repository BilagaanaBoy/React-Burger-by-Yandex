import React, { FunctionComponent, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';

import styles from './IngredientConstructor.module.css';

import PropTypes from 'prop-types';
import { TItem } from '../../utils/types';

import { DELETE_INGREDIENT } from '../../services/actions';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../utils/hooks';

interface IIngredientConstructor  {
  item: TItem;
  index: number;
  dragElement: (dragIndex: number, hoverIndex: number) => void;
}



const  IngredientConstructor: FunctionComponent<IIngredientConstructor> = (props) => {
  const { item, index, dragElement } = props;
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);
  

  const [ , dragRef] = useDrag({
    type: 'constructorElement',
    item: () => {
      return { item, index };
    }
  });

  const [, dropRef] = useDrop({
    accept: 'constructorElement',
    hover: (item: TItem, monitor) => {
      if (!item.index || item.index === index) 
        return;
      if (!ref.current) return;
      let hoverMiddle = (ref.current.getBoundingClientRect().bottom - ref.current.getBoundingClientRect().top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      let hoverUser = clientOffset.y - ref.current.getBoundingClientRect().top;

      if (item.index < index && hoverUser < hoverMiddle) 
        return;
      if (item.index > index && hoverUser > hoverMiddle) 
        return;
      dragElement(item.index, index);
      item.index = index;
    },
  });
  dragRef(dropRef(ref));

  function deleteIngredient(item: TItem) {
    dispatch({
      type: DELETE_INGREDIENT,
      item: item,
      qnt: 1,
    });
  }

  return (
    <div ref={ref} className={styles.flex} key={item.uniqueId} >
      <DragIcon type="primary" />
      <ConstructorElement
        handleClose={() => deleteIngredient(item)}
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
      />
    </div>
  );
}

export default IngredientConstructor;
