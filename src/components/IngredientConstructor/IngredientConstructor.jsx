import React, { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';

import styles from './IngredientConstructor.module.css';

import PropTypes from 'prop-types';
import { ingredientsType } from '../../utils/propTypesConst';

import { DELETE_INGREDIENT } from '../../services/actions';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function IngredientConstructor(props) {
  const { item, index, dragElement } = props;
  const dispatch = useDispatch();
  const ref = useRef(null);
  

  const [ , dragRef] = useDrag({
    type: 'constructorElement',
    item: () => {
      return { item, index };
    }
  });

  const [, dropRef] = useDrop({
    accept: 'constructorElement',
    hover: (item, monitor) => {
      if (item.index === index) 
        return;
      
      let hoverMiddle = (ref.current.getBoundingClientRect().bottom - ref.current.getBoundingClientRect().top) / 2;
      let hoverUser = monitor.getClientOffset().y - ref.current.getBoundingClientRect().top;

      if (item.index < index && hoverUser < hoverMiddle) 
        return;
      if (item.index > index && hoverUser > hoverMiddle) 
        return;
      dragElement(item.index, index);
      item.index = index;
    },
  });
  dragRef(dropRef(ref));

  function deleteIngredient(item) {
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

IngredientConstructor.propTypes = {
  item: ingredientsType.isRequired,
  index: PropTypes.number,
  dragElement: PropTypes.func.isRequired,
};