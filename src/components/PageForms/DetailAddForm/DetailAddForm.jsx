import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../../../context/userContext';
import css from './../HomeAddForm/FormStyles.module.css';
import Button from '../../Button/Button';

function DetailAddForm({ detailsFn }) {
  const { clientId } = useParams();
  const { addDetail } = useContext(UserContext);
  const [detail, setDetail] = useState('');
  const [mechPrice, setMechPrice] = useState('');
  const [detailPrice, setDetailPrice] = useState('');

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'detailField':
        setDetail(value);
        break;
      case 'mechPriceField':
        setMechPrice(Number(value));
        break;
      case 'detailPriceField':
        setDetailPrice(Number(value));
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setDetail('');
    setMechPrice('');
    setDetailPrice('');
  };

  const submitDetail = async (e) => {
    e.preventDefault();

    const newDetail = {
      detail,
      mechPrice,
      detailPrice,
    };

    await addDetail(clientId, newDetail);
    detailsFn();
    reset();
  };

  return (
    <form className={css.formContainer} onSubmit={submitDetail}>
      <h2 className={css.formTitle}>Add Detail</h2>
      <div className={css.formGroup}>
        <input
          className={css.inputField}
          type='text'
          name='detailField'
          value={detail}
          placeholder='Detail'
          autoComplete="off"
          onChange={onHandleChange}
        />
        <label className={css.labelField}>Detail</label>
      </div>
      <div className={css.formGroup}>
        <input
          className={css.inputField}
          type='text'
          name='mechPriceField'
          value={mechPrice}
          placeholder='Mech Price'
          autoComplete="off"
          onChange={onHandleChange}
        />
        <label className={css.labelField}>Mech Price</label>
      </div>
      <div className={css.formGroup}>
        <input
          className={css.inputField}
          type='text'
          name='detailPriceField'
          value={detailPrice}
          placeholder='Detail Price'
          autoComplete="off"
          onChange={onHandleChange}
        />
        <label className={css.labelField}>Detail Price</label>
      </div>
      <Button type='Submit' label={'Submit'} styleName={'submitBtn'} />
    </form>
  );
}

export default DetailAddForm;
