import { FunctionComponent } from 'react';
import styles from './ModalOverlay.module.css';

interface IModalOverlayProps {
  onClick: () => void;
}

const ModalOverlay: FunctionComponent<IModalOverlayProps> = ({ onClick}) => {
  return <div className={styles.overlay} onClick={onClick}></div>;
}

export default ModalOverlay;