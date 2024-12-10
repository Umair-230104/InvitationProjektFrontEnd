import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnvelopeAnimation from "./EnvelopeAnimation";
import ParticipantsList from "./ParticipantsList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnvelopeAnimation />} />
        <Route path="/participants" element={<ParticipantsList />} />
      </Routes>
    </Router>
  );
};


export default App;
