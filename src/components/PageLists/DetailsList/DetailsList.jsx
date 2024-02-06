import { useContext } from "react";
import DetailItem from "./../../PageListItems/DetailItem";
import css from './../ListStyles.module.css';
import UserContext from "../../../context/userContext";
import { useParams } from "react-router-dom";


function DetailList({ fetchClientsDetails }) {
  const { clientId, sessionId } = useParams();
  const { filterDetails } = useContext(UserContext);
  const filteredDetails = filterDetails(Number(clientId), Number(sessionId));
  


  return (
    <div className={css.listContainer}>


      <h3 className={css.listTitle}>ДЕТАЛІ</h3>
      <ul>
        {filteredDetails && filteredDetails.length > 0 ? (
          filteredDetails.map((detail) => (
            <DetailItem key={detail.id} detailItem={detail} fetchClientDetails={fetchClientsDetails}/>
          ))
        ) : (
          <p>деталі відсутні</p>
        )}
      </ul>
    </div>
  );
}

export default DetailList;
