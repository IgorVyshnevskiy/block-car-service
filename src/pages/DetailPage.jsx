import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import DetailsList from '../components/PageLists/DetailsList/DetailsList';
import PageCard from '../components/PageCard';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';

function DetailPage() {
  const { clientId, detailId } = useParams();
  const [detail, setDetail] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/clients/${clientId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch client details');
        }
        const data = await response.json();
        const session = data.sessions.find((session) => session.id === Number(detailId));

        if (!session) {
          throw new Error('Session not found');
        }

        setDetail(session);
      } catch (error) {
        console.error(error);
      }
    };



    fetchClientDetails();
  }, [clientId, detailId]);

  const GoBack = () => {
    navigate(location.state?.from || `/clients/${clientId}`);
  };

  return (
    <PageCard>
      <Header title={'Detail List'} />

      <GoBackBtn onclickHandler={GoBack}/>
      {detail ? (
        <div>
          <DetailsList details={detail}/>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </PageCard>
  );
}

export default DetailPage;

