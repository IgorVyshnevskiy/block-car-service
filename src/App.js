import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        <Route path='/clients/:clientId/session/:sessionId' element={<DetailPage />} />
      </Routes>
      <ToastContainer />
    </CarServiceProvider>
  );
}

export default App;
