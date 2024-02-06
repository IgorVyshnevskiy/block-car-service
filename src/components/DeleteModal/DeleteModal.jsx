import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './DeleteModal.module.css';
import Button from '../Button/Button';
import { RxCrumpledPaper } from "react-icons/rx";
import { FaTrashCanArrowUp } from "react-icons/fa6";

const modalRoot = document.querySelector('#modal-root');

function DeleteModal({ onConfirm, onClose, deleteName, isOpen }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Enter' || event.code === 'Space') {
        onConfirm();
      } else if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onConfirm]);

  const handleBackdropClick = (event) => {
    event.stopPropagation(); 

    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  

  return createPortal(
    <div className={css.overlay}  onClick={handleBackdropClick}>
      <div className={css.modalContainer}>
        <p className={css.modalText}>
          Ви впевнені же хочете видалити {deleteName}?
        </p>
        <div className={css.btnWrapper}>
          <Button onClick={onConfirm} label={<>
          Так <RxCrumpledPaper color='black' style={{ marginLeft: '4px' }}/></>} styleName={'modalConfirm'}/>
          <Button onClick={onClose} label={<>
          Ні <FaTrashCanArrowUp color='black' style={{ marginLeft: '4px' }}/></>} styleName={'modalClose'}/>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export default DeleteModal;
