import { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const CarServiceProvider = ({ children }) => {
  const [filter, setFilter] = useState('')

  const [clients, setClients] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [clientEdit, setClientEdit] = useState({
    client: {},
    edit: false,
  });

  useEffect(() => {
    fetchClients()
  }, [])   
 
 

  const fetchClients = async () => {
    const response = await fetch(`http://localhost:5000/clients`);
    const data = await response.json();
    setClients(data);
    setIsLoading(false);
  };
  




  const deleteClient = async (id) => {
    await fetch(`http://localhost:5000/clients/${id}`, { method: 'DELETE' });
    setClients(clients.filter((item) => item.id !== id));
  };

  const addClient = async (newClient) => {
    const response = await fetch('http://localhost:5000/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClient),
    });

    const data = await response.json();

    setClients([data, ...clients]);
  };
    
  const updateClients = async (id, updClient) => {
    try {
      const response = await fetch(`http://localhost:5000/clients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updClient),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update client');
      }
  
      const data = await response.json();
  
      setClients(clients.map((item) => (item.id === id ? data : item)));
  
      setClientEdit({
        client: {},
        edit: false,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const editClient = (client) => {
    setClientEdit({
      client,
      edit: true,
    })
  }

  const changeFilter = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const filterUsers = () => {
    const normalizedFilter = filter.toLowerCase();
    return clients.filter(client =>
      client.owner.toLowerCase().includes(normalizedFilter)
    );
  };
  const filterdClients = filterUsers();

  return (
    <UserContext.Provider
      value={{
        clients,
        clientEdit,
        isLoading,
        filterdClients,
        changeFilter,
        addClient,
        deleteClient,
        fetchClients,
        updateClients,
        editClient,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
