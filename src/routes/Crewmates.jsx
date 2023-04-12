import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

function Crewmates() {
  const [crewmates, setCrewmates] = useState([]);

  async function getCrewmates() {
    const { data, error } = await supabase.from("crewmates").select();
    if (error) {
      console.log(error);
      return;
    }
    setCrewmates(prev => data);
  }

  useEffect(() => {
    getCrewmates();
  }, []);

  return (
    <div className="crewmates">
      <h1>Crewmates Gallery</h1>
      <h2>Current Crewmates Count: {crewmates.length}</h2>
      <Link to="new">+ New Crewmate</Link>
      <ul className="card-list">
        {crewmates.map((crewmate) => (
          <li key={crewmate.id} className="card">
            <div className={`avatar ${crewmate.color}`}>ඞ</div>
            <h3>{crewmate.name}</h3>
            <p className="color">color: { crewmate.color && `${crewmate.color}`}</p>
            <p className="speed">speed: { crewmate.speed && `${crewmate.speed} kph`}</p>
            <Link to={`${crewmate.id}`}>Profile</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Crewmates;
