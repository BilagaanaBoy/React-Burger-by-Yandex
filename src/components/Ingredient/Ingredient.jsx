import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useHistory, useLocation } from 'react-router-dom';

import clsx from 'clsx';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Ingredient.module.css';

import { ingredientsType } from '../../utils/propTypesConst';

function Ingredient(props) {
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
      <img src={props.item.image} alt={props.item.image} className={styles.image} />
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

Ingredient.propTypes = {
  item: ingredientsType.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};