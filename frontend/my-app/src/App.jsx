// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import DefaultLayout from "./components/DefaultLayout";
import Home1 from "./components/StartHome";
import Contact from "./components/Contact";
import About from "./components/About";
import VillageSurvey from "./components/VillageSurvey";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with the navbar via the DefaultLayout */}
        <Route element={<DefaultLayout />}>
          {/* Home1 becomes the default landing page */}
          <Route path="/" element={<Home1 />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/villagesurvey" element={<VillageSurvey />} />
          {/* You can remove the /shome route if "/" is now your default */}
        </Route>

        {/* Login and Register routes without the navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
