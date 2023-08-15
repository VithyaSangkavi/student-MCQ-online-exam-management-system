import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExamPaper() {

    const [examID, setExamID] = useState(localStorage.getItem("ExamID"));

    //Fetch Questions

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, [questions]);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/questions');
            console.log('Fetched questions:', response.data);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    //Fetch Answers

    const [answers, setAnswers] = useState([]);

    const fetchAnswers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/answers');
            console.log('Fetched answers:', response.data);
            setAnswers(response.data);
        } catch (error) {
            console.error('Error fetching answers:', error);
        }
    };

    useEffect(() => {
        fetchAnswers();
    }, [answers])

    return (
        <>
            <div className="p-4 flex justify-start">
                <button className="bg-gray-300 px-4 py-2 rounded">Back</button>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="w-2/5 p-6 text-center">
                    <p className="text-lg font-semibold">Time Left: 00:15 mins</p>
                    <div className="mt-6">
                        {questions.map((question) => (
                            <>
                                <p className="mt-2 text-l text-left">{question.questionText}</p>
                                < div className="mt-4 space-y-2 border-2 p-[25px]" >
                                    {
                                        answers.map((answer) => (
                                            <label key={answer.id} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    className="form-radio"
                                                    name="answer"
                                                    value={answer.id}
                                                />
                                                <span className="ml-2">{answer.answerValue}</span>
                                            </label>
                                        ))
                                    }
                                </div >
                            </>
                        ))}

                        <div className="flex justify-center mt-6 space-x-4">
                            <button className="bg-[#9CA3AF] text-black px-4 py-2 rounded w-[220px] h-[40px] mr[100px]">Prev</button>
                            <p className="mt-2">Question 1</p>
                            <button className="bg-[#9CA3AF] text-black px-4 py-2 rounded w-[220px] h-[40px] ml[30px]">Next</button>
                        </div>
                    </div>
                </div>
            </div >

            <div className="mt-auto">
                <div className="p-4 flex justify-end">
                    <button className="bg-[#31C48D] text-white px-4 py-2 rounded mr-2">Save</button>
                    <button className="bg-[#3F83F8] text-white px-4 py-2 rounded">Complete</button>
                </div>
            </div>
        </>
    )
}

export default ExamPaper;