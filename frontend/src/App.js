import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './index.css'
import LoginForm from './pages/loginForm';
import TeacherInterface from "./pages/teacherInterface";
import StudentInterface from "./pages/studentInterface";
import AddExam from "./pages/addexam";
import ExamPaper from "./pages/examPaper";
import DisplayResults from "./pages/displayResults";
import ExamPaperSummary from "./pages/examPaperSummary";
import Navbar from "./components/NavBar";
import FrontPage from "./pages/frontPage";

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/teacherInterface" element={<TeacherInterface />} />
          <Route path="/studentInterface" element={<StudentInterface />} />
          <Route path="/addExam" element={<AddExam />} />
          <Route path="/examPaper" element={<ExamPaper />} />
          <Route path="/displayResults" element={<DisplayResults />} />
          <Route path="examPaperSummary" element={<ExamPaperSummary />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
