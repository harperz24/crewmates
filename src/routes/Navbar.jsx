import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <ul>
        <li><h2 className="brand">Among Us</h2></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/crewmates">Crewmates Gallery</Link></li>
        <li><Link to="/crewmates/new">Add New Crewmate</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
