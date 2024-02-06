import { useContext } from "react";
import UserContext from "../../../context/userContext";
import SessionItem from "../../PageListItems/SessionItem";

function SessionList({ fetchClientDetails, clientId }) {
  const { filterSessions } = useContext(UserContext);
  const filteredSessions = filterSessions(clientId);
  
  const reversedSessions = filteredSessions.slice().reverse();

  return (
    <div>
      <ul>
        {reversedSessions && reversedSessions.length > 0 ? (
          reversedSessions.map((session) => (
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
