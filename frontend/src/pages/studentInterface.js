import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/searchBar';

function StudentInterface() {
    const [exams, setExams] = useState([]);
    const [filteredExams, setFilteredExams] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
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
                                <td className="py-2 px-4">{exam.examName}</td>
                                <td className="py-2 px-4">{exam.startDateAndTime}</td>
                                <td className="py-2 px-4">{exam.duration} minutes</td>
                                <td className="py-2 px-4">{exam.examStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default StudentInterface;