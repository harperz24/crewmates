import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, Home, CrewmatesLayout, Crewmates, Crewmate, NewCrewMate } from "./routes";
import "./App.css";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="crewmates" element={<CrewmatesLayout />}>
            <Route index element={<Crewmates />} />
            <Route path=":id" element={<Crewmate />} />
            <Route path="new" element={<NewCrewMate />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
