import React, { useContext } from 'react';
import ClientItem from '../ClientItem';
import UserContext from '../../context/userContext';

function ClientList() {
  const { filterdClients } = useContext(UserContext);

  return (
    <div>
      <ul>
        {filterdClients && filterdClients.length > 0 ? (
          filterdClients.map((client) => <ClientItem key={client.id} client={client} />)
        ) : (
          <p>No clients available</p>
        )}
      </ul>
    </div>
  );
}

export default ClientList;
