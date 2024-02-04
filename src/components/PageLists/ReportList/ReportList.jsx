import React from 'react';
import ReportItem from "../../PageListItems/ReporItem/ReportItem";
import css from './../ListStyles.module.css';

function ReportList({ fetchClientsDetails, details }) {
  return (
    <div className={css.listContainer}>
      <h3 className={css.listTitle}>ЗАУВАЖЕННЯ</h3>
      <ul>
        {details && details.reports ? (
          details.reports.map((report) => (
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
