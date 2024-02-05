import { useState, useContext, useEffect } from 'react';
import UserContext from '../../../context/userContext';
import css from './../FormStyles.module.css';
import Button from '../../Button/Button';

function HomeAddForm() {
  const [owner, setOwner] = useState('');
  const [phone, setPhone] = useState('');
  const [car, setCar] = useState('');
  const [mileage, setMileage] = useState('');

  const { addClient, clientEdit, updateClients } = useContext(UserContext);

  useEffect(() => {
    if (clientEdit.edit) {
      setOwner(clientEdit.client.owner);
      setPhone(clientEdit.client.phone);
      setCar(clientEdit.client.car);
      setMileage(clientEdit.client.mileage);
    }
  }, [clientEdit]);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'ownerField':
        setOwner(value);
        break;
      case 'phoneField':
        setPhone(value);
        break;
      case 'carField':
        setCar(value);
        break;
      case 'mileageField':
        setMileage(value);
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setOwner('');
    setPhone('');
    setCar('');
    setMileage('');
  };

  const submitUser = (e) => {
    e.preventDefault();

    const newClient = {
      owner,
      phone,
      car,
      mileage,
      sessions: clientEdit.edit ? clientEdit.client.sessions : [],
    };

    

    if (clientEdit.edit === true) {
      updateClients(clientEdit.client.id, newClient);
    } else {
      addClient(newClient);
    }

    reset();
  };

  return (
    <form className={css.formContainer} onSubmit={submitUser}>
      <h2 className={css.formTitle}>ДОБАВИТИ КЛІЄНТА</h2>
      <div>
        <div className={css.formGroup}>
          <input
            className={css.inputField}
            type='text'
            name='ownerField'
            id='ownerField'
            value={owner}
            placeholder='імʼя'
            onChange={onHandleChange}
            required
            autoComplete="off"
          />
          <label htmlFor='ownerField' className={css.labelField}>
          імʼя
          </label>
        </div>
        <div className={css.formGroup}>
          <input
            className={css.inputField}
            type='text'
            name='phoneField'
            value={phone}
            placeholder='номер телефону'
            onChange={onHandleChange}
            autoComplete="off"
            required
          />
          <label htmlFor='phoneField' className={css.labelField}>номер телефону</label>
        </div>
        <div className={css.formGroup}>
          <input
            className={css.inputField}
            type='text'
            name='carField'
            value={car}
            placeholder='авто'
            onChange={onHandleChange}
            autoComplete="off"
            required
          />
          <label htmlFor='carField' className={css.labelField}>авто</label>
        </div>
        <div className={css.formGroup}>
          <input
            className={css.inputField}
            type='text'
            name='mileageField'
            value={mileage}
            placeholder='пробіг'
            onChange={onHandleChange}
            autoComplete="off"
            required
          />
          <label htmlFor='mileageField' className={css.labelField}>пробіг</label>
        </div>
       
       
        <Button type='submit' label={'Добавити'} styleName={'submitBtn'} />
      </div>
    </form>
  );
}

export default HomeAddForm;
