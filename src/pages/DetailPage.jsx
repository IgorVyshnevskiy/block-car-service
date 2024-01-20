import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import DetailsList from '../DetailsList/DetailsList';

function DetailPage() {
  const { clientId, detailId } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/clients/${clientId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch client details');
        }
        const data = await response.json();

        // Assuming "sessions" is an array within the client object
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

  return (
    <div>
      <Header title={'Detail List'} />
      {detail ? (
        <div>
          <DetailsList details={detail}/>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DetailPage;

