import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ExamPaperSummary() {
    //Getting the localhost url from .env
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    //Header Configuration
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const navigate = useNavigate();

    //Declaring states
    const [studentsCount, setStudentsCount] = useState(0);
    const [completedStudentsCount, setCompletedStudentsCount] = useState(0);
    const [attendingStudents, setAttendingStudents] = useState([]);
    const [completedStudents, setCompletedStudents] = useState([]);

    const [startDateAndTime, setStartDateAndTime] = useState(null);
    const [duration, setDuration] = useState(null);
    const [examEndTime, setExamEndTime] = useState(null);

    const examID = localStorage.getItem("ExamID");
    const userID = localStorage.getItem("Stu")

    useEffect(() => {
        axios.get(`${apiUrl}/exams/${examID}`, config)
            .then(examResponse => {
                const examDetails = examResponse.data;
                setStartDateAndTime(examDetails.startDateAndTime);
                setDuration(examDetails.duration);

                // Calculate examEndTime
                const durationInMilliseconds = duration * 60 * 1000; // Convert duration to milliseconds
                const startTime = new Date(startDateAndTime).getTime(); // Convert start time to milliseconds
                const examEndTimeInMilliseconds = startTime + durationInMilliseconds;
                setExamEndTime(examEndTimeInMilliseconds);
            })
            .catch(error => {
                console.error('Error fetching exam details:', error);
            });

        axios.get(`${apiUrl}/users`, config)
            .then(response => {
                const users = response.data;
                const studentUsers = users.filter(user => user.userType === 'Student');
                setStudentsCount(studentUsers.length);
                setAttendingStudents(studentUsers);

                axios.get(`${apiUrl}/results`, config)
                    .then(resultsResponse => {
                        const completedStudentsIDs = resultsResponse.data
                            .filter(result => result.examStatusStudent === 'Completed' && result.examID == examID)
                            .map(result => result.userID);

                        // Filter the student users to get completed students
                        const completedStudentsData = studentUsers.filter(student => completedStudentsIDs.includes(student.userID));
                        setCompletedStudents(completedStudentsData);

                        console.log(completedStudentsData.length)

                        setCompletedStudentsCount(completedStudentsData.length);
                    })
                    .catch(error => {
                        console.error('Error fetching results:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    //Delete exam function
    const deleteExam = async () => {
        console.log(examID)
        try {
            const response = await axios.delete(`${apiUrl}/exams/${examID}`, config);

            console.log('Exam deleted successfully');
            navigate('/teacherInterface')

        } catch (error) {
            console.error('Error deleting exam:', error);
        }
    };

    //Formatting time
    const formatTime = (timeInMilliseconds) => {
        const date = new Date(timeInMilliseconds);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours || 12; // Handle midnight

        minutes = minutes.toString().padStart(2, '0');
        return `${hours}:${minutes} ${ampm}`;
    };


    return (
        <>
            <div className="p-4 flex justify-start">
                <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => navigate('/addExam')} >Back</button>
            </div>
            <div className="flex mt-8 ml-4">
                <div className="w-3/5 mr-4">
                    <div className="border-2 p-[20px]">
                        <p className="font-semibold">Exam completed</p> <br />
                        <p className="text-center text-7xl">{completedStudentsCount}/{studentsCount}</p> <br />
                    </div>
                    <div className="border-2 p-[20px] h-[200px] mt-6">
                        <p className="font-semibold">Exam started time: {startDateAndTime !== null ? formatTime(startDateAndTime) : ''}</p>
                        <p className="font-semibold mt-2">Exam ending time: {examEndTime !== null ? formatTime(examEndTime) : ''}</p>
                    </div>
                </div>

                <div className="w-2/5 border-2 p-[20px] mr-4">
                    <p className="font-semibold">Attending Students List</p>
                    {attendingStudents.map((student, index) => (
                        <div className="flex border-2 p-[10px] mt-6" key={index}>
                            <p>{student.userName}</p>
                            {completedStudents.some(completedStudent => completedStudent.userID === student.userID) && (
                                <p className="ml-[400px] text-[#31C48D] font-bold">Completed</p>
                            )}
                        </div>
                    ))}
                </div>
            </div >
            <div className="flex justify-end mt-8">
                <button type="submit" onClick={deleteExam} className="bg-[#C81E1E] text-white font-bold px-4 py-2 rounded mt-4 mr-[20px] w-[150px]">
                    End Exam
                </button>
            </div>
        </>
    );
}

export default ExamPaperSummary;
