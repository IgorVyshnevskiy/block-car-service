import React, { useContext } from 'react';
import ClientList from '../components/PageLists/ClientList';
import Filter from '../components/Filters/Filter';
import Header from '../components/Header';
import HomeAddForm from '../components/PageForms/HomeAddForm';
import PageCard from '../components/PageCard';
import UserContext from '../context/userContext';

function HomePage() {
  // Assume you have a context or state where you can access the list data
  // For demonstration purposes, let's assume you have a context named UserContext
  // and it provides access to the list of clients
  // Replace 'UserContext' and 'clients' with your actual context and list name
  const { clients } = useContext(UserContext);

  // Determine the length of the clients list
  const clientsLength = clients.length;

  return (
    <PageCard>
      <Header title={'Block Car'} />
      <HomeAddForm />
      {clientsLength > 0 && (
        <>
          <Filter />
          <ClientList />
        </>
      )}
    </PageCard>
  );
}

export default HomePage;
