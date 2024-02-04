import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import DetailsList from '../components/PageLists/DetailsList/DetailsList';
import PageCard from '../components/PageCard';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';
import DetailAddForm from '../components/PageForms/DetailAddForm';
import ReportList from '../components/PageLists/ReportList';
import css from './PageStyles.module.css';
import TotalPriceTag from '../components/TotalPriceTag';

function DetailPage() {
  const { clientId, sessionId } = useParams();
  const [detail, setDetail] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchClientDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/clients/${clientId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch client details');
      }
      const data = await response.json();
      const session = data.sessions.find((session) => session.id === Number(sessionId));

      if (!session) {
        throw new Error('Session not found');
      }

      setDetail(session);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClientDetails();
  }, [clientId, sessionId]);

  const GoBack = () => {
    navigate(location.state?.from || `/clients/${clientId}`);
  };

  return (
    <PageCard>
      <Header title={'Block car'} />

      <GoBackBtn onclickHandler={GoBack}/>
      {detail ? (
        <div>
          <div className={css.detailBlockSession}>
            <p className={css.detailPurpose}><span className={css.textColor}>Причина звернення:</span> {detail.purpose}</p>
            <p className={css.detailDate}><span className={css.textColor}>Дата: </span>{detail.date}</p>
          </div>
          <DetailAddForm fetchClientsDetails={fetchClientDetails}/>
          <DetailsList details={detail} fetchClientsDetails={fetchClientDetails}/>
          <TotalPriceTag details={detail}/>
          <ReportList details={detail} fetchClientsDetails={fetchClientDetails}/>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </PageCard>
  );
}
export default DetailPage;

