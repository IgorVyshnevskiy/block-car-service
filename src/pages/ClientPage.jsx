import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import SessionList from '../components/SessionList';
import SessionAddForm from '../components/SessionAddForm';

function ClientPage() {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);

  const fetchClientDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/clients/${clientId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch client details');
      }
      const data = await response.json();
      setClient(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  
  useEffect(() => {
    fetchClientDetails();
  },[clientId]);
  

  return (
    <div>
      <Header title={'Client List'} />
      {client ? (
        <div>
          <h2>
            {client.owner}'s {client.car} Details
          </h2>
          <p>ID: {client.id}</p>
          <p>Phone: {client.phone}</p>
          <p>Mileage: {client.mileage}</p>
          <h3>Sessions:</h3>
          <SessionAddForm sessionFn={fetchClientDetails}/>
          <SessionList sessions={client} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ClientPage;
