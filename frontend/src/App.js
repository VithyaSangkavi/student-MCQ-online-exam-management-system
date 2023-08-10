import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import LoginForm from './pages/loginForm';
import TeacherInterface from "./pages/teacherInterface";
import StudentInterface from "./pages/studentInterface";
import AddExam from "./pages/addexam";
import ExamPaper from "./pages/examPaper";
import DisplayResults from "./pages/displayResults";
import ExamPaperSummary from "./pages/examPaperSummary";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/teacherInterface" element={<TeacherInterface/>} />
          <Route path="/studentInterface" element={<StudentInterface/>} />
          <Route path="/addExam" element={<AddExam/>}/>
          <Route path="/examPaper" element={<ExamPaper/>}/>
          <Route path="/displayResults" element={<DisplayResults/>}/>
          <Route path="examPaperSummary" element={<ExamPaperSummary/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
