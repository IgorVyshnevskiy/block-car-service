import React from 'react';
import css from './DetailListItem.module.css';
import { BsTools } from "react-icons/bs";
import Button from '../../Button/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';

function DetailItem({ detailItem }) {

  if (!detailItem) {
    return <p>Detail is undefined</p>;
  }
  return (
    <li key={detailItem.id} className={css.detailListItem}>
      <BsTools/>
      <div>
      <p>ID {detailItem.id}</p>
      <p>Detail: {detailItem.detail}</p>
      <p>Mech Price: {detailItem.mechPrice}</p>
      <p>detailPrice: {detailItem.detailPrice}</p>
      </div>
      <div >
        <Button
          // onClick={handleEditClick}
          label={
            <>
              Edit
              <FaEdit color='black'/>
            </>
          }
          styleName={'editBtn'}
        />
        <Button
          // onClick={handleDeleteClick}
          label={
            <>
              Delete <FaTrash color='black' style={{ marginLeft: '4px' }} />
            </>
          }
          styleName={'deleteBtn'}
        />
      </div>
    </li>
  );
}

export default DetailItem;
