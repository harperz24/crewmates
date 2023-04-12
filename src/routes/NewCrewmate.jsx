import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { SUCCESS_MESSAGES } from "../constants";
import ProfileForm from "../ProfileForm";


function NewCrewMate() {
  const initInput= {
    name: "",
    speed: "",
    color: "",
  }
  const [input, setInput] = useState(initInput);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setInput(prevInput => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    createCrewmate({
      name: input.name, 
      speed: input.speed ? parseInt(input.speed) : null, 
      color: input.color 
    });
    setInput(prev => initInput);
    setSuccessMessage(prev => SUCCESS_MESSAGES.CREATED);
    setTimeout(() => {
      navigate('/crewmates');
    }, 2000); 
  }

  function handleCancel() {
    navigate('/crewmates');
  }

  async function createCrewmate(newCrewmate) {
    const { data, error } = await supabase.from("crewmates").insert(newCrewmate).select();
    if (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Create New Crewmate Profile</h2>
      <ProfileForm 
        input={input}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
      { successMessage && <p className="success">{successMessage}</p> }
    </div>
  );
}

export default NewCrewMate;
