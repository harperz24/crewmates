function ProfileForm({ input, handleChange, handleSubmit, handleCancel }) {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>Name
        <input name="name" type="text" required placeholder="Enter crewmate name" value={input.name} onChange={(e) => handleChange(e)} />
      </label>
      
      <label>Speed (kph)
        <input name="speed" type="number" placeholder="Enter crewmate number" value={input.speed} min={0} onChange={(e) => handleChange(e)} />
      </label>
      
      <label>Color
        <select name="color" value={input.color} onChange={(e) => handleChange(e)}>
          <option value="">---Select color---</option>
          <option value="pink">Pink</option>
          <option value="purple">Purple</option>
          <option value="green">Green</option>
          <option value="orange">Orange</option>
        </select>
      </label>
      <div className="buttons">
        <button type="submit">Submit</button>
        <button onClick={() => handleCancel()}>Cancel</button>
      </div>
    </form>
  )
}

export default ProfileForm;