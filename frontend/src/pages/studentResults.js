import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function StudentResults() {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const userID = localStorage.getItem('userID');
    const examID = localStorage.getItem('StuExamID');

    const [examResults, setExamResults] = useState([]);

    useEffect(() => {
        // Fetch all results
        const fetchResults = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                const response = await axios.get(`${apiUrl}/results`, config);
                console.log('Fetched all exam results:', response.data);

                console.log(examID, userID)

                // Filter the results based on examID and userID
                const filteredResults = response.data.filter((result) => {
                    return result.examID == examID && result.userID == userID;
                });

                console.log('Filtered exam results:', filteredResults);
                setExamResults(filteredResults);
            } catch (error) {
                console.error('Error fetching exam results:', error);
            }
        };

        fetchResults();
    }, [apiUrl, examID, userID]);

    const calculateGrade = (marks) => {
        if (marks >= 85 && marks <= 100) {
            return 'A';
        } else if (marks >= 65 && marks < 85) {
            return 'B';
        } else if (marks >= 45 && marks < 65) {
            return 'C';
        } else {
            return 'F';
        }
    };

    // Function to determine pass/fail based on marks
    const isPassed = (marks) => {
        return marks > 45;
    };

    return (
        <div className="flex justify-center h-[400px] mt-[50px]">
        <div className="border border-gray-300 p-6 rounded-lg mt-[20px]">
            <h1 className='text-red-600'>Only one attempt is allowed. You already completed this exam</h1><br/><br/>
            <h1 className="text-2xl font-bold mb-4">Your Results</h1>
            <ul className="list-disc pl-6">
                {examResults.map((result) => (
                    <h1 key={result.id} className="mb-4">
                    <p className="text-xl border p-2">Marks: {result.marks}</p><br/>
                    <p className="text-xl border p-2">Grade: {calculateGrade(result.marks)}</p><br/>
                    <p className={`text-2xl font-bold border p-2 ${isPassed(result.marks) ? 'text-green-600' : 'text-red-600'}`}>
                        {isPassed(result.marks) ? 'Status: Passed' : 'Status: Failed'}
                    </p>
                </h1>
                ))}
            </ul>
        </div>
    </div>
    );
}

export default StudentResults;
