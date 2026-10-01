import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav__logo">
        Latin America Travel App
      </NavLink>
      <div className="nav__links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/destinations">Destinations</NavLink>
        <NavLink to="/map">Map</NavLink>
      </div>
    </nav>
  );
}

export default Nav;