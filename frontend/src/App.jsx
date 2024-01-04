import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInUp from "./pages/SignInUp";
import Open from "./pages/Open";
import HomePages from "./pages/HomePage";

import MakeCall from "../src/components/calls/MakeCall";
import ReceiveCall from "../src/components/calls/ReceiveCall";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin-signup" element={<SignInUp />} />
        <Route path="/home" element={<HomePages />} />
        <Route path="/" index element={<Open />} />
        <Route path="/make-call" element={<MakeCall />} />
        <Route path="/receive-call" element={<ReceiveCall />} />
      </Routes>
    </Router>
  );
}

export default App;
