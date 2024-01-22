import React, { FunctionComponent, ReactElement, ReactNode, ReactPortal } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const portalRoot = document.getElementById('portal-modals');

interface IModalProps {
    children: ReactNode | '';
    onClose: () => void;
    header?: string;
  }

  const Modal: FunctionComponent<IModalProps> = (props) => {

    const handlerEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            closeModal();
        }
    }

    const closeModal = () => {
        props.onClose();
    }

    React.useEffect(() => {
        document.addEventListener('keydown', handlerEsc);
        return () => {
            document.removeEventListener('keydown', handlerEsc);
        };
    }, []);

    if (!portalRoot) {
        return null;
      }

    return ReactDOM.createPortal(
        <div>
            <ModalOverlay onClick={closeModal} />
            <div className={styles.modal}>
                <div className={clsx(styles.header,' mt-10 mr-10 ml-10')}>
                    <h1 className={' text text_type_main-large'}>
                        {props.header}
                    </h1>
                    <section className={styles.closeButton} onClick={props.onClose}>
                        <CloseIcon type="secondary" />
                    </section>
                </div>
                <div>{props.children}</div>
            </div>
        </div>,
        portalRoot
    );
}

export default Modal;