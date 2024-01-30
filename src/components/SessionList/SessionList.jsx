import SessionItem from "../SessionItem";

function SessionList({ sessions, fetchClientDetails }) {

  return (
    <div>
      <ul>
        {sessions.sessions && sessions.sessions.length > 0 ? (
          sessions.sessions.map((session) => (
            <SessionItem key={session.id} details={session} fetchClientDetails={fetchClientDetails}/>
          ))
        ) : (
          <p>No details available</p>
        )}
      </ul>
    </div>
  );
}

export default SessionList;
