import { useContext } from "react";
import UserContext from "../../context/userContext";

const Filter = () => {
  const {changeFilter} = useContext(UserContext)

  return (
    <div >
    <label>
      Find contacts by name
      <input type="text"  onChange={changeFilter} />
    </label>

    </div>
  );
};


export default Filter