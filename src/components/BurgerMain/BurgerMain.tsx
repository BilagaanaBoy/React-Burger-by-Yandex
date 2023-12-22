
import { FunctionComponent,ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './BurgerMain.module.css';

import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

interface IBurgerMainProps  {
  setModalOpen: (modalChild: ReactNode, modalHeader: string) => void;
}

const BurgerMain: FunctionComponent<IBurgerMainProps> = (props) => {
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
