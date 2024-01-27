import { useContext, useEffect, useState } from "react"
import UserContext from "../../context/userContext";
import { useParams } from "react-router-dom";

function SessionAddForm({sessionFn}) {
  const { clientId } = useParams();
  const { sessionEdit,  updateSessions } = useContext(UserContext);
  const [date, setDate] = useState('')
  const [purpose, setPurpose] = useState('')
  const [sessionMileage, setSessionMileage] = useState('')
  


  useEffect(() => {
    if(sessionEdit.edit) {
      setDate(sessionEdit?.session.date)
      setPurpose(sessionEdit?.session.purpose)
      setSessionMileage(sessionEdit?.session.sessionMileage)
    } 
  }, [sessionEdit])

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'purposeField':
        setPurpose(value);
        break;
      case 'dateField':
        setDate(value);
        break;
      case 'sessionMileageField':
        setSessionMileage(Number(value));
        break;
      default:
        return;
    }
  };

  const reset = () => {
    setDate('');
    setPurpose('');
    setSessionMileage('');
  };
  const submitSession = (e) => {
    e.preventDefault()
    if(sessionEdit.edit) {
      updateSessions(clientId, {...sessionEdit.session, purpose, sessionMileage, date }, sessionFn)
    }

    reset()
  }

  
  return (
    <form onSubmit={submitSession}>
    <h2>Add Session</h2>
    <div>
    <label>
          <h3>Date</h3>
          <input
            type='date'
            name='dateField'
            value={date}
            onChange={onHandleChange}
          />
        </label>
      <label>
        <h3>Purpose</h3>
        <input
          type='text'
          name='purposeField'
          value={purpose}
          placeholder='purpose'
          onChange={onHandleChange}
        />
      </label>
      <label>
        <h3>User Mileage</h3>
        <input
          type='text'
          name='sessionMileageField'
          value={sessionMileage}
          placeholder='cars mileage'
          onChange={onHandleChange}
        />
      </label>
      <button type='submit'>Submit</button>
    </div>
  </form>
  )
}

export default SessionAddForm
