import { Link } from "react-router-dom";
import { GAME_INTRO, GAME_HISTORY } from "../constants";

function Home() {
  return (
    <div className="home">
      <h1><span className="brand">Among Us</span> Intro</h1>
      <img src="https://cdn.mos.cms.futurecdn.net/B5n7of5HvycyiWiYbW2MnR-1200-80.jpg" alt="among us"/>
      <p>{GAME_INTRO}</p>
      <p>{GAME_HISTORY}</p>
      <Link to="crewmates">Explore Crewmates Gallery</Link>
    </div>
  );
}

export default Home;
