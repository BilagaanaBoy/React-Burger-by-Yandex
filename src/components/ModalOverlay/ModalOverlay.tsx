import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';

interface IModalOverlayProps {
  onClick: () => void;
}

const ModalOverlay: FunctionComponent<IModalOverlayProps> = ({ onClick}) => {
  return <div className={styles.overlay} onClick={onClick}></div>;
}

export default ModalOverlay;