import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaTrash, FaRegEdit, FaRegCheckCircle } from 'react-icons/fa';
import { nanoid } from 'nanoid';
import { animateScroll as scroll } from 'react-scroll';

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

let sessionCounter = 1

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
  const [detailEdit, setDetailEdit] = useState({
    clientId: null,
    sessionId: null,
    details: {},
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

  const updateSessions = async (clientId, updatedSession, callback) => {
    try {
      const client = clients.find((c) => c.id === Number(clientId));
      if (!client) {
        console.error(`Client with ID ${clientId} not found`);
        return;
      }
  
      const updatedSessions = client.sessions.map((session) => {
        if (session.id === updatedSession.id) {
          return { ...session, ...updatedSession };
        }
        return session;
      });
  
      const updatedClient = { ...client, sessions: updatedSessions };
  
      const response = await fetch(`http://localhost:5000/clients/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedClient),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update client');
      }
  
      const data = await response.json();
      setClients((prevClients) =>
        prevClients.map((item) => (item.id === Number(clientId) ? data : item))
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
  
      let sessionId = sessionCounter;
      const usedSessionIds = new Set(client.sessions.map((session) => session.id));
  
      while (usedSessionIds.has(sessionId)) {
        sessionId++;
      }
  
     
    const updatedClient = {
      ...client,
      sessions: [...(client.sessions || []), {
        id: sessionId,
        ...newSession,
        totalPrice: 0,  
        details: [],    
        reports: [],    
      }],
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

const deleteItem = async (clientId, sessionId, itemId, itemType, callback) => {
  try {
    const client = clients.find((c) => c.id === Number(clientId));
    if (!client) {
      console.error(`Client with ID ${clientId} not found`);
      return;
    }

    const session = client.sessions.find((s) => s.id === Number(sessionId));
    if (!session) {
      console.error(`Session with ID ${sessionId} not found`);
      return;
    }

    let updatedItems;
    if (itemType === 'report') {
      updatedItems = session.reports.filter((item) => item.id !== itemId);
    } else if (itemType === 'detail') {
      updatedItems = session.details.filter((item) => item.id !== itemId);
    } else {
      console.error(`Invalid itemType: ${itemType}`);
      return;
    }

    const updatedSession = { ...session, [itemType + 's']: updatedItems };
    const updatedClientSessions = client.sessions.map((s) =>
      s.id === Number(sessionId) ? updatedSession : s
    );

    const updatedClient = { ...client, sessions: updatedClientSessions };

    const response = await fetch(`http://localhost:5000/clients/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedClient),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ${itemType}`);
    }

    const data = await response.json();
    setClients((prevClients) =>
      prevClients.map((item) => (item.id === Number(clientId) ? data : item))
    );

    toast.error(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deleted`, {
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

const addDetail = async (clientId, sessionId, newDetail) => {
  try {
    const client = clients.find((c) => c.id === Number(clientId));

    if (!client) {
      console.error(`Client with ID ${clientId} not found`);
      throw new Error(`Client with ID ${clientId} not found`);
    }

    const session = client.sessions.find((s) => s.id === sessionId);

    if (!session) {
      console.error(`Session with ID ${sessionId} not found`);
      throw new Error(`Session with ID ${sessionId} not found`);
    }

    const updatedSession = {
      ...session,
      details: [...(session.details || []), { id: nanoid(), ...newDetail }],
    };

    const updatedSessions = client.sessions.map((s) =>
      s.id === sessionId ? updatedSession : s
    );

    const updatedClient = {
      ...client,
      sessions: updatedSessions,
    };

    const response = await fetch(`http://localhost:5000/clients/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedClient),
    });

    if (!response.ok) {
      throw new Error('Failed to add detail');
    }

    const data = await response.json();

    try {
      setClients((prevClients) =>
        prevClients.map((item) => (item.id === Number(clientId) ? data : item))
      );
    } catch (error) {
      console.error('Error updating clients on the client side:', error);
    }

    toast.success(`Detail added`, {
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



const updateDetails = async (clientId, sessionId, updatedDetail, fetchClientsDetails) => {
  try {
    const client = clients.find((c) => c.id === Number(clientId));
    if (!client) {
      console.error(`Client with ID ${clientId} not found`);
      return;
    }

    const session = client.sessions.find((s) => s.id === Number(sessionId));
    if (!session) {
      console.error(`Session with ID ${sessionId} not found`);
      return;
    }

    const updatedDetails = session.details.map((detail) => {
      if (detail.id === updatedDetail.id) {
        return { ...detail, ...updatedDetail };
      }
      return detail;
    });

    const updatedSession = { ...session, details: updatedDetails };

    const updatedClientSessions = client.sessions.map((s) =>
      s.id === Number(sessionId) ? updatedSession : s
    );

    const updatedClient = { ...client, sessions: updatedClientSessions };

    const response = await fetch(`http://localhost:5000/clients/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedClient),
    });

    if (!response.ok) {
      throw new Error('Failed to update details');
    }

    const data = await response.json();
    setClients((prevClients) =>
      prevClients.map((item) => (item.id === Number(clientId) ? data : item))
    );

    setDetailEdit({
      clientId: null,
      sessionId: null,
      details: {},
      edit: false,
    });

    fetchClientsDetails();

    toast.warning(`Detail updated`, {
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

const editDetail = (clientId, sessionId, detailId, callback) => {
  const client = clients.find((c) => c.id === Number(clientId));

  if (!client) {
    console.error(`Client with ID ${clientId} not found`);
    return;
  }

  const session = client.sessions.find((s) => s.id === sessionId);

  if (!session) {
    console.error(`Session with ID ${sessionId} not found`);
    return;
  }

  const detail = session.details.find((d) => d.id === detailId);

  if (!detail) {
    console.error(`Detail with ID ${detailId} not found`);
    return;
  }

  setDetailEdit({
    clientId: client.id,
    sessionId: session.id,
    detail,
    edit: true,
  });
  callback()
};


const scrollDuration = 500;

  const editClient = (client) => {
    scroll.scrollToTop({
      duration: scrollDuration
    });
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

  return (
    <UserContext.Provider
      value={{
        clients,
        clientEdit,
        isLoading,
        filterdClients,
        filterSessions,
        sessionEdit,
        detailEdit,
        setSessionEdit,
        changeFilter,
        changeSessionFilter,
        addClient,
        deleteClient,
        fetchClients,
        updateClients,
        deleteItem,
        addDetail,
        updateDetails,
        editClient,
        editDetail,
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
