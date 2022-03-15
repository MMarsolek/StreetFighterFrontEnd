import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import NavBar from "./components/NavBar.js";
import Characters from "./pages/Characters.js";
import CharacterPage from "./pages/CharacterPage.js";
import Resources from "./pages/Resources.js";
import Login from "./pages/LogIn.js";
import Profile from "./pages/Profile.js";
import Signup from "./pages/Signup.js";
import Combo from "./pages/Combo.js";
import PageNotFound from './pages/404';

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Characters/>}/>
          <Route path="/characters/:characterName" element={<CharacterPage/>}/>
          <Route path="/resources" element={<Resources/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/register" element={<Signup/>}/>
          <Route path="/combos/:id" element={<Combo/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
