import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import SessionList from '../components/PageLists/SessionList';
import SessionAddForm from '../components/PageForms/SessionAddForm';
import PageCard from '../components/PageCard';
import SessionFilter from '../components/Filters/SessionFilter';
import css from './PageStyles.module.css';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';

function ClientPage() {
  const { clientId } = useParams();
  const [client, setClient] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

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
  }, [clientId]);

  const GoBack = () => {
    navigate(location.state?.from || '/');
  };
  return (
    <PageCard>
      <Header title={'Block car'} />
      <GoBackBtn onclickHandler={GoBack}/>
      {client ? (
        <div>
          <div className={css.clientDetailsBlock}>
            <h2 className={css.clientName}>
              {client.owner} {client.car} Деталі
            </h2>
            <div className={css.detailFlex}>
              <p className={css.detailBlockparagraph}>
                <span className={css.detailBlockparagraphColor}>Номер телефону:</span>{' '}
                {client.phone}
              </p>
              <p className={css.detailBlockparagraph}>
                <span className={css.detailBlockparagraphColor}>Пробіг авто:</span>{' '}
                {client.mileage} км
              </p>
            </div>
          </div>
          <SessionAddForm sessionFn={fetchClientDetails} />
          {client.sessions.length > 0 && <><SessionFilter />
          
          <SessionList
            sessions={client}
            fetchClientDetails={fetchClientDetails}
            clientId={clientId}
          />
          </>}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </PageCard>
  );
}

export default ClientPage;
