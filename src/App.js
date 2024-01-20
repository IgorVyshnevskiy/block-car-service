import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { CarServiceProvider } from './context/userContext';
import ClientPage from './pages/ClientPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <CarServiceProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/clients/:clientId' element={<ClientPage />} />
        <Route path='/clients/:clientId/details/:detailId' element={<DetailPage />} />
      </Routes>
    </CarServiceProvider>
  );
}

export default App;
