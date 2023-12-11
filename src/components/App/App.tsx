import React, { useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import styles from './App.module.css';

import AppHeader  from '../AppHeader/AppHeader';
import BurgerMain from '../BurgerMain/BurgerMain';
import Modal from '../Modal/Modal';
import NotFound404 from '../NotFound404/NotFound404';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { DELETE_DETAILS } from '../../services/actions';
import { getData } from '../../services/actions/mainAction';

import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';

import Ingredientdetails from '../../pages/IngredientDetails/IngredientDetails';
import { Location } from 'history';

type TLocationState = {
  background: Location;
}

function App() {
  
  const [modalStatus, setStatusModa] = React.useState(false);
  const [modalHeader, setModalHeader] = React.useState('');
  const [modalContent, setModalContent] = React.useState<ReactNode | ''>('');

  const history = useHistory();
  const location = useLocation<TLocationState>();
  const dispatch = useDispatch<any>();

  let switchBack;
  if (history.action === 'PUSH' || history.action === 'REPLACE') {
    switchBack = location.state && location.state.background;
  } else {
    switchBack = undefined;
  }

  function setIngredientModalClose() {
    history.goBack();
  }

  const setModalOpen = (newModalContent: ReactNode, modalLabel = 'Modal') =>  {
    setModalHeader(modalLabel);
    setModalContent(newModalContent);
    setStatusModa(true);
  }

  const setModaClose = () => {
    setStatusModa(false);
    dispatch({
      type: DELETE_DETAILS,
    });
  }

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

    return (
      <div>
        {/* @ts-ignore */}
        <AppHeader className={styles.header} />
        <Switch location={switchBack || location}>
          <Route path="/" exact>
            <BurgerMain setModalOpen={setModalOpen} />
            {modalStatus && (
              <Modal setModaClose={setModaClose} header={modalHeader}>
                {modalContent}
              </Modal>
            )}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <ProtectedRoute path="/profile">
            <Profile />
          </ProtectedRoute>
          <Route path="/ingredients/:id">
            <Ingredientdetails/>
          </Route>
          <Route path="/">
            <NotFound404 />
          </Route>
        </Switch>
        {switchBack && (
          <Route path="/ingredients/:id">
            <Modal setModaClose={setIngredientModalClose}>
              <Ingredientdetails />
            </Modal>
          </Route>
        )}
      </div>
    );

}

export default App;
