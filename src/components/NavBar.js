import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">Character Selection</Link>
      <Link to="/resources">Resources</Link>
      {/* TODO: hide this if logged in */}
      <Link to="/login">Log in or Create Account</Link>
      {/* TODO: hide this if not logged in */}
      <Link to="/profile">Profile</Link>
    </nav>
  );
}

export default NavBar;
