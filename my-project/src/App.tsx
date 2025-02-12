import "./App.css";
import "./index.css";
import StartPage from "./pages/StartPage";
import InterviewPage from "./pages/InterviewPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/interview" element={<InterviewPage />} />
      </Routes>
    </Router>
  );
}
export default App;
