import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

import { SUCCESS_MESSAGES } from "../constants";
import ProfileForm from "../ProfileForm";

function Crewmate() {
  let params = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [updatedCrewmate, setUpdatedCrewmate] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleClickUpdate() {
    setErrorMessage(prev => "");
    setSuccessMessage(prev => "");
    setIsUpdating(prev => true);
  }

  function handleClickDelete() {
    deleteCrewmate(params.id);
    setCrewmate(prev => null);
    setSuccessMessage(prev => SUCCESS_MESSAGES.DELETED);    
    setTimeout(() => {
      navigate('/crewmates');
    }, 2000); 
  }

  function handleChange(e) {
    setErrorMessage(prev => "");
    setUpdatedCrewmate(prevInput => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      crewmate.name === updatedCrewmate.name && 
      crewmate.speed === updatedCrewmate.speed && 
      crewmate.color === updatedCrewmate.color
    ) {
      setErrorMessage(prev => "No updated field. Please submit after updating");
      return;
    }
    updateCrewmate(params.id, {
      name: updatedCrewmate.name, 
      speed: updatedCrewmate.speed ? parseInt(updatedCrewmate.speed) : null, 
      color: updatedCrewmate.color 
    });
    setSuccessMessage(prev => SUCCESS_MESSAGES.UPDATED);
    setTimeout(() => {
      getCrewmate(params.id);
      setIsUpdating(prev => false);
      setSuccessMessage(prev => ""); 
    }, 2000);
  }

  function handleCancel() {
    setErrorMessage(prev => "");
    setSuccessMessage(prev => "");
    setIsUpdating(prev => false);
  }

  async function getCrewmate(id) {
    try {
      const { data, error } = await supabase.from("crewmates").select().eq("id", id).maybeSingle();
      if (!data) {
        throw new Error('Crewmate not found');
      }
      setCrewmate(prev => data);
      setUpdatedCrewmate(prev => data);
    } catch(error) {
      setErrorMessage(error.message);
      console.log(error);
    }
  }

  async function updateCrewmate(id, updatedCrewmate) {
    const { data, error } = await supabase
      .from("crewmates")
      .update(updatedCrewmate)
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
    }
  }

  async function upsertCrewmate(crewmate) {
    const { data, error } = await supabase
      .from("crewmates")
      .upsert(crewmate)
      .select();
    if (error) {
      console.log(error);
    }
  }

  async function deleteCrewmate(id) {
    const { error } = await supabase.from("crewmates").delete().eq("id", id);
    if (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCrewmate(params.id);
  }, []);

  return (
    <div>
      {isUpdating 
      ? <div>
          <h2>Update Crewmate Profile</h2>
          <ProfileForm 
            input={updatedCrewmate}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          />
        </div>
      : crewmate && 
        <div>
          <h1>{crewmate.name}</h1>
          <div className={`avatar ${crewmate.color}`}>ඞ</div>
          {crewmate.color && <p>color: {crewmate.color}</p>}
          {crewmate.speed && <p>speed: {crewmate.speed} /kph</p>}
          <div className="buttons">
            <button onClick={() => handleClickUpdate()}>Update Profile</button>
            <button onClick={() => handleClickDelete()}>Delete Crewmate</button>  
            <Link to="/crewmates">Back to Gallery</Link>
          </div>
          
        </div>
      }
      { successMessage && <p className="success">{successMessage}</p> }
      { errorMessage && <p className="error">{errorMessage}</p> }
    </div>
  );
}

export default Crewmate;
