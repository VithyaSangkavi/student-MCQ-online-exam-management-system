import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/searchBar';
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";



function StudentInterface() {
    //Getting the localhost url from .env
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    //Header configuration
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    //Declaring states
    const [exams, setExams] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredExams, setFilteredExams] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);

    const [examStatuses, setExamStatuses] = useState({});
    const [userInfo, setUserInfo] = useState(null); 
    const [nowDate] = useState(new Date());

    const navigate = useNavigate('');

    useEffect(() => {
        fetchExams();
    }, []);

    //Fetch exams
    const fetchExams = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`${apiUrl}/exams`, config, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Fetched exams:', response.data);
            console.log("respones: ", response.data.startDateAndTime)
            console.log("State: ", nowDate)

            const publishedExams = response.data.filter(exam => exam.examStatus === 'Published');
            setExams(publishedExams);

            // Fetch exam statuses from the results table
            const examStatusData = await axios.get(`${apiUrl}/results`, config);
            const examStatusesMap = {};

            // Create a map of examID to exam status
            examStatusData.data.forEach(result => {
                examStatusesMap[result.examID] = examStatusesMap[result.examID] || {};
                examStatusesMap[result.examID][result.userID] = 'Completed';
            });

            setExamStatuses(examStatusesMap);
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    };

    //Handle search exams
    const handleSearch = (query) => {
        setSearchQuery(query);

        // Filter exams based on the exam name
        const filtered = exams.filter((exam) => {
            return exam.examName.toLowerCase().includes(query.toLowerCase());
        });
        setFilteredExams(filtered);
        setSearchClicked(true);
    };

    //View a particular exam
    const viewExam = async (pExamID) => {
        const userID = localStorage.getItem('userID');
        console.log('View Exam user id: ', userID)

        const examID = localStorage.getItem('StuExamID');

        // Check if the user has already completed the exam based on examID
        if (
            examStatuses[pExamID] &&
            examStatuses[pExamID][userID] &&
            examStatuses[pExamID][userID] === 'Completed'
        ) {
            localStorage.setItem('StuExamID', pExamID);

            console.log('User has already completed this exam');
            navigate(`/studentResults/${pExamID}/${userID}`);
        } else {
            localStorage.setItem('StuExamID', pExamID);

            try {
                const response = await axios.get(`${apiUrl}/exam-time`, config);
                console.log('Fetched exam time:', response.data);

                console.log('User ID:', userID);
                console.log('Exam ID:', examID);

                if (response.data.userID === userID && response.data.examID === examID) {
                    navigate('/examPaper');
                } else {
                    const currentDateTime = new Date();

                    try {
                        const examResponse = await axios.get(`${apiUrl}/exams/${examID}`, config);
                        const examDurationInMinutes = examResponse.data.duration;

                        const examEndTime = new Date(currentDateTime.getTime() + (examDurationInMinutes * 60000)); // 60000 milliseconds in a minute

                        const examTimeData = {
                            examStartTime: currentDateTime,
                            examEndTime: examEndTime,
                            userID: userID,
                            examID: examID
                        };

                        const examTimeResponse = await axios.post(`${apiUrl}/exam-time`, examTimeData, config);
                        console.log('Exam time added:', examTimeResponse.data);

                        localStorage.setItem('endTime', examEndTime);

                        navigate('/examPaper');
                    } catch (error) {
                        console.error('Error adding exam time:', error);
                    }
                }
            } catch (error) {
                console.error('Error fetching exam time:', error);
            }
        }
    };

    return (
        <>
            <div className="py-4 px-6 flex justify-between items-center">
                <div className="flex items-center">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>

            <div className="m-4">
                <table className="w-full bg-white border-2">
                    <thead>
                        <tr className="bg-[#C3DDFD] border-2">
                            <th className="py-2 px-4 text-left">Exam</th>
                            <th className="py-2 px-4 text-left">Starting Time</th>
                            <th className="py-2 px-4 text-left">Exam Duration</th>
                            <th className="py-2 px-4 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(searchClicked ? filteredExams : exams).map((exam) => (
                            <tr key={exam.id} className="border-2">
                                <button disabled={new Date(exam.startDateAndTime) < nowDate ? false : true} onClick={() => { viewExam(exam.examID) }}
                                className={new Date(exam.startDateAndTime) < nowDate ? 'text-black' : 'text-gray-400'}> <td className="py-2 px-4">{exam.examName}</td> </button>
                                <td className="py-2 px-4">{format(new Date(exam.startDateAndTime), "EEE MMM dd yyyy HH:mm:ss")}</td>
                                <td className="py-2 px-4">{exam.duration} minutes</td>
                                <td className="py-2 px-4">
                                    {examStatuses[exam.examID] && examStatuses[exam.examID][localStorage.getItem('userID')] ? (
                                        <span className="text-green-600">Completed</span>
                                    ) : (
                                        <span className="text-blue-600">Pending</span>
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default StudentInterface;