import { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/userContext';
import css from './FormStyles.module.css';
import Button from '../Button/Button';

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
        setPhone(Number(value));
        break;
      case 'carField':
        setCar(value);
        break;
      case 'mileageField':
        setMileage(Number(value));
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

    console.log(newClient);

    if (clientEdit.edit === true) {
      updateClients(clientEdit.client.id, newClient);
    } else {
      addClient(newClient);
    }

    reset();
    // fetchClientDetail()
  };

  return (
    <form className={css.formContainer} onSubmit={submitUser}>
      <h2 className={css.formTitle}>Add user</h2>
      <div>
        <div className={css.formGroup}>
          <input
            className={css.inputField}
            type='text'
            name='ownerField'
            id='ownerField'
            value={owner}
            placeholder='User Name'
            onChange={onHandleChange}
          />
          <label htmlFor='ownerField' className={css.labelField}>
            User Name
          </label>
        </div>
        <div className={css.formGroup}>
          <input
            className={css.inputField}
            type='text'
            name='phoneField'
            value={phone}
            placeholder='phone'
            onChange={onHandleChange}
          />
          <label htmlFor='phoneField' className={css.labelField}>User Phone</label>
        </div>
        <div className={css.formGroup}>
          <input
            className={css.inputField}
            type='text'
            name='carField'
            value={car}
            placeholder='User car'
            onChange={onHandleChange}
          />
          <label htmlFor='carField' className={css.labelField}>User Car</label>
        </div>
        <div className={css.formGroup}>
          <input
            className={css.inputField}
            type='text'
            name='mileageField'
            value={mileage}
            placeholder='mileage'
            onChange={onHandleChange}
          />
          <label htmlFor='mileageField' className={css.labelField}>User Mileage</label>
        </div>
       
       
        <Button type='submit' label={'Submit'} styleName={'submitBtn'} />
      </div>
    </form>
  );
}

export default HomeAddForm;
