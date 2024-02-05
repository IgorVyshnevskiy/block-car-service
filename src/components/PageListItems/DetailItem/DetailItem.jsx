import React, { useContext, useState } from 'react';
import css from './DetailListItem.module.css';
import { BsTools } from 'react-icons/bs';
import Button from '../../Button/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import UserContext from '../../../context/userContext';
import { useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
import DeleteModal from '../../DeleteModal';

function DetailItem({ detailItem, fetchClientDetails }) {
  const { editDetail, deleteItem } = useContext(UserContext);
  const { clientId, sessionId } = useParams();

  const scrollDuration = 500;
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const handleEditClick = (e) => {
    e.stopPropagation();
  
    scroll.scrollToTop({
      duration: scrollDuration
    });
  
    editDetail(Number(clientId),Number(sessionId), detailItem.id, fetchClientDetails);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsModalVisible(true);
  };

  const handleConfirmDelete = () => {
    setIsModalVisible(false);
    deleteItem(
      clientId,
      sessionId,
      detailItem.id,
      'detail',
      fetchClientDetails
    );;
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };
  
  // const handleDeleteClick = (e) => {
  //   e.stopPropagation();
  //   deleteItem(
  //     clientId,
  //     sessionId,
  //     detailItem.id,
  //     'detail',
  //     fetchClientDetails
  //   );
  // };

  if (!detailItem) {
    return <p>Detail is undefined</p>;
  }
  return (
    <li key={detailItem.id} className={css.detailListItem}>
      <div className={css.contentContainer}>
        

        <div className={css.detailContainer}>
          <p>
          <BsTools className={css.detailLogo} />
            <span className={css.textColor}>Запчастина:</span> {detailItem.detail}
          </p>
        </div>
        <div className={css.priceContainer}>
          <p className={css.mechPrice}>
            <span className={css.textColor}>Робота:</span> +
            {detailItem.mechPrice} грн.
          </p>
          <p>
            <span className={css.textColor}>Запчастина:</span>{' '}
            {detailItem.detailPrice} грн.
          </p>
        </div>
      </div>
      <div className={css.btnWrapper}>
        <p className={css.combinedPriceTag}>{detailItem.combinePrice} грн.</p>
        <Button
          onClick={handleEditClick}
          label={
            <>
              Редагувати
              <FaEdit color='black' style={{ marginLeft: '4px' }} />
            </>
          }
          styleName={'editBtn'}
        />
        <Button
          onClick={handleDeleteClick}
          label={
            <>
              Видалити <FaTrash color='black' style={{ marginLeft: '4px' }} />
            </>
          }
          styleName={'deleteBtn'}
        />
      </div>
      {isModalVisible && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          onClose={handleCancelDelete}
          deleteName={'запчастину'}
          isOpen={isModalVisible}
        />
      )}
    </li>
  );
}

export default DetailItem;
