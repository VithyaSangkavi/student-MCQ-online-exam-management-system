import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExamPaperSummary() {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }
    
    const [studentsCount, setStudentsCount] = useState(0);
    const [completedStudentsCount, setCompletedStudentsCount] = useState(0);
    const [attendingStudents, setAttendingStudents] = useState([]);
    const [completedStudents, setCompletedStudents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/users', config)
            .then(response => {
                const users = response.data;
                const studentUsers = users.filter(user => user.userType === 'Student');
                setStudentsCount(studentUsers.length);
                setAttendingStudents(studentUsers);

                axios.get('http://localhost:3000/results', config)
                    .then(resultsResponse => {
                        const completedStudentsIDs = resultsResponse.data
                            .filter(result => result.examStatusStudent === 'Completed')
                            .map(result => result.userID);

                        // Filter the student users to get completed students
                        const completedStudentsData = studentUsers.filter(student => completedStudentsIDs.includes(student.userID));
                        setCompletedStudents(completedStudentsData);
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

    return (
        <>
            <div className="p-4 flex justify-start">
                <button className="bg-gray-300 px-4 py-2 rounded">Back</button>
            </div>
            <div className="flex mt-8 ml-4">
                <div className="w-3/5 mr-4">
                    <div className="border-2 p-[20px]">
                        <p className="font-semibold">Exam completed</p>
                        <p className="text-center text-7xl">{completedStudentsCount}/{studentsCount}</p>
                        <p className="text-center mt-4">Time left: 00:30 mins</p>
                    </div>
                    <div className="border-2 p-[20px] h-[200px] mt-6">
                        <p className="font-semibold">Exam started time:</p>
                        <p className="font-semibold mt-2">Exam ending time:</p>
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
                <button className="bg-[#C81E1E] text-white font-bold px-4 py-2 rounded mt-4 mr-[20px] w-[150px]">
                    End Exam
                </button>
            </div>
        </>
    );
}

export default ExamPaperSummary;
