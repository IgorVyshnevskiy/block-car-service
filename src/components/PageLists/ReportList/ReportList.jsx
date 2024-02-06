import React, { useContext } from 'react';
import ReportItem from "../../PageListItems/ReporItem/ReportItem";
import css from './../ListStyles.module.css';
import { useParams } from 'react-router-dom';
import UserContext from '../../../context/userContext';

function ReportList({ fetchClientsDetails, details }) {
  const { clientId, sessionId } = useParams();
  const { filterReports } = useContext(UserContext);
  const filteredReports = filterReports(Number(clientId), Number(sessionId));
  console.log(filteredReports)

  return (
    <div className={css.listContainer}>
      <h3 className={css.listTitle}>ЗАУВАЖЕННЯ</h3>
      <ul>
      {filteredReports && filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <ReportItem key={report.id} reportItem={report} fetchClientDetails={fetchClientsDetails} />
          ))
        ) : (
          <p>No report available</p>
        )}
      </ul>
    </div>
  );
}

export default ReportList;
