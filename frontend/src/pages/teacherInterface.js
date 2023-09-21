import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from '../components/searchBar';
import { useNavigate } from 'react-router-dom';

function TeacherInterface() {
    const navigate = useNavigate();
    
    //Getting the localhost url from .env
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    //Header configuration
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }

    //Declaring states
    const [exams, setExams] = useState([]);
    const [filteredExams, setFilteredExams] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [examName, setExamName] = useState('');
    const [startDateAndTime, setStartDateAndTime] = useState('');
    const [duration, setDuration] = useState('');

    useEffect(() => {
        teacherExams();
    }, []);

    //Fetch exams
    const teacherExams = async () => {
        try {
            const response = await axios.get(`${apiUrl}/exams`, config); 
            console.log('Fetched exams:', response.data);
            setExams(response.data);
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    };

    //Handle search exam
    const handleSearch = (query) => {
        setSearchQuery(query);

        // Filter exams based on the exam name
        const filtered = exams.filter((exam) => {
            return exam.examName.toLowerCase().includes(query.toLowerCase());
        });
        setFilteredExams(filtered);
        setSearchClicked(true);
    };
    
    //Create new exam
    const createExam = async () => {
        const userID = localStorage.getItem('userID')
        
        try {
            const examData = {
                examName: null,
                startDateAndTime: null,
                duration: null,
                examStatus: 'Draft',
                userID: userID
            };

            const response = await axios.post(`${apiUrl}/exams`, examData, config);
            console.log('Exam added:', response.data);
            localStorage.setItem("ExamID", response.data.examID)

            navigate('/addExam');

        } catch (error) {
            console.error('Error adding exam:', error);
        }
    };

    //View a particular exam
    const viewExam = (pExamID, pExamName) => {
        localStorage.setItem("ExamID", pExamID);
        localStorage.setItem("examName", pExamName);
        navigate('/addExam');
        // localStorage.setItem('viewSummaryExamID', examID);
        // localStorage.setItem('viewSummaryUserID', userID);
        // navigate('/examPaperSummary');
    };


    return (
        <>
            <div className="py-4 px-6 flex justify-between items-center">
                <div className="flex items-center">
                    <SearchBar onSearch={handleSearch} />
                </div>
                <button className="py-2 px-4 bg-[#31C48D] rounded text-white font-bold" onClick={createExam}> New Exam </button>
            </div>

            <div className="m-4">
                <table className="w-full bg-white border-2">
                    <thead>
                        <tr className="bg-[#C3DDFD] border-2">
                            <th className="py-2 px-4 text-left">Exam</th>
                            <th className="py-2 px-4 text-left">Last Updated</th>
                            <th className="py-2 px-4 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(searchClicked ? filteredExams : exams).map((exam) => (
                           
                           <tr key={exam.id} className="border-2">
                                <button onClick={() => {viewExam(exam.examID, exam.examName)}}><td className="py-2 px-4">{exam.examName}</td> </button>
                                <td className="py-2 px-4">{new Date().toLocaleString()}</td>
                                <td className="py-2 px-4">{exam.examStatus}</td>
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TeacherInterface;
