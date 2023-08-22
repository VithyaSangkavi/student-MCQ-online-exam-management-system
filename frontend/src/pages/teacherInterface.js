import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from '../components/searchBar';
import { useNavigate } from 'react-router-dom';

function TeacherInterface() {
    const navigate = useNavigate();

    const [exams, setExams] = useState([]);
    const [filteredExams, setFilteredExams] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    
    const [examName, setExamName] = useState('');
    const [startDateAndTime, setStartDateAndTime] = useState('');
    const [duration, setDuration] = useState('');

    useEffect(() => {
        teacherExams();
    }, []);

    const teacherExams = async () => {
        try {
            const response = await axios.get('http://localhost:3000/exams');
            console.log('Fetched exams:', response.data);
            setExams(response.data);
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    };

    const handleSearch = (query) => {
        const filtered = exams.filter((exam) => {
            return exam.examID.toString().toLowerCase().includes(query.toLowerCase());
        });
        setFilteredExams(filtered);
        setSearchClicked(true);
    };
    
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

            const response = await axios.post('http://localhost:3000/exams', examData);
            console.log('Exam added:', response.data);
            localStorage.setItem("ExamID", response.data.examID)

            navigate('/addExam');

        } catch (error) {
            console.error('Error adding exam:', error);
        }
    };

    const viewExam = (pExamID, pExamName) => {
        localStorage.setItem("ExamID", pExamID);
        localStorage.setItem("examName", pExamName);
        navigate('/addExam');
    };


    return (
        <>
            <div className="py-4 px-6 flex justify-between items-center">
                <div className="flex items-center">
                    <SearchBar onSearch={handleSearch} />
                    {/* <button className='rounded bg-[#5850EC] pr-10 pl-10 pt-2 pb-2 text-white h-[35px] font-bold ml-[15px]'>Search</button> */}
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
