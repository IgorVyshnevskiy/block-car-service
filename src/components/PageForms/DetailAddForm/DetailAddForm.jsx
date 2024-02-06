import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../../../context/userContext';
import css from './../FormStyles.module.css';
import Button from '../../Button/Button';

function DetailAddForm({ fetchClientsDetails }) {
  const { clientId, sessionId } = useParams();
  const { detailEdit, updateDetails, addDetail } = useContext(UserContext);
  const [detail, setDetail] = useState('');
  const [mechPrice, setMechPrice] = useState('');
  const [detailPrice, setDetailPrice] = useState('');

  useEffect(() => {
    if (detailEdit.edit) {
      setDetail(detailEdit?.detail.detail);
      setMechPrice(detailEdit?.detail.mechPrice);
      setDetailPrice(detailEdit?.detail.detailPrice);
    }
  }, [detailEdit]);
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
    if (name === 'mechPriceField' || name === 'detailPriceField') {
      if (isNaN(value)) {
        return
      } else {
        parsedValue = Number(value);
      }
    }
    switch (name) {
      case 'detailField':
        setDetail(parsedValue);
        break;
      case 'mechPriceField':
        setMechPrice(parsedValue); 
        break;
      case 'detailPriceField':
        setDetailPrice(parsedValue); 
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

    const combinePrice = Number(mechPrice) + Number(detailPrice);

    const newDetail = {
      detail,
      mechPrice: Number(mechPrice),
      detailPrice: Number(detailPrice),
      combinePrice,
    };

    if (detailEdit.edit) {
      await updateDetails(
        clientId,
        sessionId,
        { ...detailEdit.detail, ...newDetail },
        fetchClientsDetails
      );
    } else {
      await addDetail(Number(clientId), Number(sessionId), newDetail);
      fetchClientsDetails();
    }
    reset();
  };

  return (
    <form className={`${css.formContainer} ${css.detailContainer}`} onSubmit={submitDetail}>
      <h2 className={css.formTitle}>ДОБАВИТИ ЗАПЧАСТИНУ</h2>
      <div className={css.formGroup}>
        <input
          className={css.inputField}
          type='text'
          name='detailField'
          value={detail}
          placeholder='запчастина'
          autoComplete='off'
          required
          onChange={onHandleChange}
        />
        <label className={css.labelField}>запчастина</label>
      </div>
      <div className={css.priceInputGroup}>
        <div className={css.formGroup}>
          <input
            className={css.inputField}
            type='text'
            name='mechPriceField'
            value={mechPrice}
            maxLength={7}
            placeholder='ціна за роботу'
            autoComplete='off'
            required
            onChange={onHandleChange}
          />
          <label className={css.labelField}>ціна за роботу</label>
        </div>
        <div className={css.formGroup}>
          <input
            className={css.inputField}
            type='text'
            name='detailPriceField'
            value={detailPrice}
            maxLength={7}
            placeholder='ціна за запчастину'
            autoComplete='off'
            required
            onChange={onHandleChange}
          />
          <label className={css.labelField}>ціна за запчастину</label>
        </div>
      </div>
      <Button type='Submit' label={'Добавити'} styleName={'submitBtn'} />
    </form>
  );
}

export default DetailAddForm;
