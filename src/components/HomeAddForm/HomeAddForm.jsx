import { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/userContext';

function HomeAddForm() {
  const [owner, setOwner] = useState('');
  const [phone, setPhone] = useState('');
  const [car, setCar] = useState('');
  const [mileage, setMileage] = useState('');

  const { addClient, clientEdit, updateClients } = useContext(UserContext);

  useEffect(() => {
    if(clientEdit.edit) {
      setOwner(clientEdit.client.owner)
      setPhone(clientEdit.client.phone)
      setCar(clientEdit.client.car)
      setMileage(clientEdit.client.mileage)

    } 
  }, [clientEdit])

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
    };
  
    console.log(newClient);
  
    if (clientEdit.edit === true) {
      updateClients(clientEdit.client.id, newClient);
    } else {
      addClient(newClient);
    }
  
    reset();
  };

  return (
    <form onSubmit={submitUser}>
      <h2>Add user</h2>
      <div>
        <label>
          <h3>User Name</h3>
          <input
            type='text'
            name='ownerField'
            value={owner}
            placeholder='name'
            onChange={onHandleChange}
          />
        </label>
        <label>
          <h3>User Phone</h3>
          <input
            type='text'
            name='phoneField'
            value={phone}
            placeholder='phone'
            onChange={onHandleChange}
          />
        </label>
        <label>
          <h3>User Car</h3>
          <input
            type='text'
            name='carField'
            value={car}
            placeholder='car'
            onChange={onHandleChange}
          />
        </label>
        <label>
          <h3>User Mileage</h3>
          <input
            type='text'
            name='mileageField'
            value={mileage}
            placeholder='cars mileage'
            onChange={onHandleChange}
          />
        </label>
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
}

export default HomeAddForm;
