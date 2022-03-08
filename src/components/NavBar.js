import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Characters from "./pages/Characters";
import About from "./pages/About";
import User from "./pages/User";
import Combos from "./pages/Combo";
import Login from "./pages/LogIn";


function NavBar() {
  return (
    <nav className="navbar">
      <Router>
        <Link to="/">character Selection</Link>
        <Link to="/about">About Us</Link>
        <Link to="/login">Login or Create Account</Link>
        <Link to="/combos">Combos</Link>
        <Link to="/profile">Profile</Link>

        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/about" element={<About />} />
          <Route path="/combos" element={<Combos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<User />} />
        </Routes>
      </Router>
    </nav>
  );
}

export default NavBar;
