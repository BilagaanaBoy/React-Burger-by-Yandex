import React from 'react';

import styles from './App.module.css';

import AppHeader  from '../AppHeader/AppHeader';
import BurgerMain from '../BurgerMain/BurgerMain';
import Modal from '../Modal/Modal';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [data, setData] = React.useState([]);
  
  const [modalStatus, setStatusModa] = React.useState(false);
  const [modalHeader, setModalHeader] = React.useState(null);
  const [modalContent, setModalContent] = React.useState(null);


  const setModalOpen = (newModalContent, modalLabel = 'Modal') =>  {
    setModalHeader(modalLabel);
    setModalContent(newModalContent);
    setStatusModa(true);
  }

  const setModaClose = () => {
    setStatusModa(false);
  }

  React.useEffect(() => {
    fetch(URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }else {
        return Promise.reject(`Error: ${response.status}`);
      }
    })
    .then((response) => {
        setData(response.data);
      })
    .catch((error) => {
      console.log(error);
    });
  }, []);

    return (
      <div>
        <AppHeader className={styles.header}/>
        <BurgerMain data={data} setModalOpen={setModalOpen}/>
        {modalStatus && 
          (<Modal header={modalHeader} setModaClose={setModaClose}>
            {modalContent}
          </Modal>
        )}
      </div>
    );

}

export default App;
