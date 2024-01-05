import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInUp from "./pages/SignInUp";
import Open from "./pages/Open";
import HomePages from "./pages/HomePage";

import CallRoom from "./components/calls/CallRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin-signup" element={<SignInUp />} />
        <Route path="/home" element={<HomePages />} />
        <Route path="/" index element={<Open />} />
        <Route path="/call" element={<CallRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
