import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaTrash, FaRegEdit, FaRegCheckCircle } from 'react-icons/fa';
import { nanoid } from 'nanoid';

const UserContext = createContext();

const addNotificationStyles = {
  color: '#111',
  background: '#4c9663',
  fontSize: '18px',
};
const deleteNotificationStyles = {
  color: '#111',
  background: '#ff3d3d',
  fontSize: '18px',
};

const updateNotificationStyles = {
  color: '#111',
  background: '#f1c40f',
  fontSize: '18px',
};
export const CarServiceProvider = ({ children }) => {
  const [filter, setFilter] = useState('');
  const [sessionFilter, setSessionFilter] = useState('');
  
  const [clients, setClients] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [clientEdit, setClientEdit] = useState({
    clients: {},
    edit: false,
  });
  const [sessionEdit, setSessionEdit] = useState({
    clientId: 0,
    session: {},
    edit: false,
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const response = await fetch(`http://localhost:5000/clients`);
    const data = await response.json();
    setClients(data);
    setIsLoading(false);
  };

  const deleteClient = async (id) => {
    await fetch(`http://localhost:5000/clients/${id}`, { method: 'DELETE' });
    setClients(clients.filter((item) => item.id !== id));
    toast.error(`Contact deleted`, {
      style: deleteNotificationStyles,
      icon: <FaTrash />,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
    toast.success(`Contact added`, {
      style: addNotificationStyles,
      icon: <FaRegCheckCircle />,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      
    });
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
      console.log('here =>', data);

      setClients((prevClients) =>
        prevClients.map((item) => (item.id === id ? data : item))
      );

      setClientEdit({
        client: {},
        edit: false,
      });
      toast.warning(`Contact updated`, {
        style: updateNotificationStyles,
        icon: <FaRegEdit />,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
      });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateSessions = async (id, updSession, callback) => {
    const client = clients.find((c) => c.id === Number(id));
    console.log(client)
    const sessions = client.sessions.map((session) => {
      if (session.id === updSession.id) {
        return updSession;
      }
      return session;
    });
    try {
      const response = await fetch(`http://localhost:5000/clients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...client, sessions }),
      });

      if (!response.ok) {
        throw new Error('Failed to update client');
      }

      const data = await response.json();
      console.log(data);

      setClients((prevClients) =>
        prevClients.map((item) => (item.id === Number(id) ? data : item))
      );

      setSessionEdit({
        session: {},
        edit: false,
      });
      callback();
      toast.warning(`Session updated`, {
        style: updateNotificationStyles,
        icon: <FaRegEdit />,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
      });
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  const addSession = async (id, newSession) => {
    try {
      const client = clients.find((c) => c.id === Number(id));
  
      if (!client) {
        console.error(`Client with ID ${id} not found`);
        return; 
      }
  
      const sessionId = nanoid();
  
      const updatedClient = {
        ...client,
        sessions: [...(client.sessions || []), { id: sessionId, ...newSession }],
      };
  
      const response = await fetch(`http://localhost:5000/clients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedClient),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add session');
      }
  
      const data = await response.json();
  
      console.log('Updated data:', data);
  
      setClients((prevClients) =>
      prevClients.map((item) => (item.id === Number(id) ? data : item))
    );

      toast.success(`Session added`, {
        style: addNotificationStyles,
        icon: <FaRegCheckCircle />,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  

const deleteSession = async (clientId, sessionId, callback) => {
  try {
    const client = clients.find((c) => c.id === Number(clientId));

    const updatedSessions = client.sessions.filter(
      (session) => session.id !== sessionId
    );

    const response = await fetch(`http://localhost:5000/clients/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...client, sessions: updatedSessions }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete session');
    }

    const data = await response.json();

    setClients((prevClients) =>
      prevClients.map((item) => (item.id === Number(clientId) ? data : item))
    );

    toast.error(`Session deleted`, {
      style: deleteNotificationStyles,
      icon: <FaTrash />,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    callback();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

  

  const editClient = (client) => {
    setClientEdit({
      client,
      edit: true,
    });
  };

  const changeFilter = (e) => {
    const { value } = e.target;
    setFilter(value);
  };
  const changeSessionFilter = (e) => {
    const { value } = e.target;
    setSessionFilter(value);
  };

  const filterUsers = () => {
    const normalizedFilter = filter.toLowerCase();
    return clients.filter((client) =>
      client.owner.toLowerCase().includes(normalizedFilter)
    );
  };
  const filterdClients = filterUsers();

  const filterSessions = (clientId) => {
    const normalizedFilter = sessionFilter.toLowerCase();
    if (!clientId) {
      return [];
    }

    const client = clients.find((c) => c.id === Number(clientId));

    if (!client) {
      console.error(`Client with ID ${clientId} not found`);
      return [];
    }

    const filteredSessions = (client.sessions || []).filter((session) =>
      session.purpose.toLowerCase().includes(normalizedFilter)
    );

    return filteredSessions;
  };

  


  // const filterSessions = () => {
  //   const normalizedFilter = sessionFilter.toLowerCase();
  //   return clients.sessions.filter((session) =>
  //     session.purpose.toLowerCase().includes(normalizedFilter)
  //   );
  // };
  // const filterdSessions = filterSessions();
  



  return (
    <UserContext.Provider
      value={{
        clients,
        clientEdit,
        isLoading,
        filterdClients,
        filterSessions,
        sessionEdit,
        setSessionEdit,
        changeFilter,
        changeSessionFilter,
        addClient,
        deleteClient,
        fetchClients,
        updateClients,
        editClient,
        updateSessions,
        addSession,
        deleteSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
