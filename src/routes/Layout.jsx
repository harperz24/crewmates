import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";

function Layout() {
  return (
    <div className="app">
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <NavBar />
      <main>
        {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;