import React from 'react';
import ReportItem from "../../PageListItems/ReporItem/ReportItem";

function ReportList({ fetchClientsDetails, details }) {
  return (
    <div>
      <h3>Report List</h3>
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
