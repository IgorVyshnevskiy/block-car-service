import { useContext } from "react";
import UserContext from "../../../context/userContext";
import SessionItem from "../../PageListItems/SessionItem";

function SessionList({fetchClientDetails, clientId }) {
  const { filterSessions } = useContext(UserContext);
  const filteredSessions = filterSessions(clientId);

  return (
    <div>
      <ul>
        {filteredSessions && filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
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
