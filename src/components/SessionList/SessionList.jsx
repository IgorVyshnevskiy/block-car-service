import SessionItem from "../SessionItem";

function SessionList({ sessions, clientId }) {
  return (
    <div>
      <ul>
        {sessions.sessions && sessions.sessions.length > 0 ? (
          sessions.sessions.map((session) => (
            <SessionItem key={session.id} details={session} clientId={clientId}/>
          ))
        ) : (
          <p>No details available</p>
        )}
      </ul>
    </div>
  );
}

export default SessionList;
