export default NavBar;
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import Home from "./pages/Home";
import About from "./pages/About";
import User from "./pages/User";
import Combos from "./pages/Combo";

function NavBar() {
  return (
    <>
      <Router>
      <Nav variant="pills" defaultActiveKey="/">
        <Nav.Item as="li">
            <Nav.Link to="/">Go Home</Nav.Link>
        </Nav.Item>
      
        <Nav.Item as="li">
            <Nav.Link to="/about">About page</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
            <Nav.Link to="/login">About page</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
            <Nav.Link to="/combos">About page</Nav.Link>
        </Nav.Item>
    </Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/combos" element={<Combos />} />
          <Route path="/login" element={<User />} />
        </Routes>
      </Router>
    </>
  );
}
