import { useLocation, useParams } from 'react-router-dom';
import { Modal } from '../modal';
import styles from './info-about-order.module.css';
import { Feed } from '@pages';

type InfoAboutFeedProps = {
  onClose?: () => void;
  children: React.ReactNode;
};

export default function InfoAboutFeed({
  onClose,
  children
}: InfoAboutFeedProps) {
  const { state } = useLocation();
  const { number } = useParams();

  return state?.background ? (
    <>
      <Feed />
      <Modal title={`#${number}`} onClose={onClose!}>
        {children}
      </Modal>
    </>
  ) : (
    <div className={styles.info_container}>
      <h3 className={`${styles.info_header} text text_type_main-large`}>
        {`#${number}`}
      </h3>
      {children}
    </div>
  );
}
