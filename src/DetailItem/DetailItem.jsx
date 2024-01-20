import React from 'react';

function DetailItem({ detailItem }) {

  return (
    <li key={detailItem.id}>
      <div>
      <p>ID {detailItem.id}</p>
      <p>Detail: {detailItem.detail}</p>
      <p>Description: {detailItem.description}</p>
      <p>Mech Price: {detailItem.mechPrice}</p>
      <p>detailPrice: {detailItem.detailPrice}</p>
      <p>Total: {detailItem.totalPrice}</p>
      <p>Label: {detailItem.labelWork}</p>
      <p>Finished: False{detailItem.finished}</p>
      </div>
    </li>
  );
}

export default DetailItem;
