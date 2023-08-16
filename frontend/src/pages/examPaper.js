import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ExamPaper() {

    const [examID, setExamID] = useState(localStorage.getItem("StuExamID"));
    const [questionNo, setQuestionNo] = useState(1);
    const [selectedAnswer, setSelectedAnswer] = useState({ questionID: null, answerID: null });
    const [trackAnswers, setTrackAnswers] = useState([]);
    const [questionID, setQuestionID] = useState('');

    const navigate = useNavigate();

    //Fetch Questions

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, [questions]);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/questions');

            // Filter questions based on examID
            const filteredQuestions = response.data.filter((question) => question.examID == examID);

            setQuestions(filteredQuestions);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };


    //Fetch Answers

    const [answers, setAnswers] = useState([]);

    const fetchAnswers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/answers');
            const filteredAnswers = response.data.filter((answer) => answer.questionID == questionID);

            setAnswers(response.data);
        } catch (error) {
            console.error('Error fetching answers:', error);
        }
    };

    useEffect(() => {
        fetchAnswers();
    }, [answers])

    const nextQuestion = async () => {
        
            try {
                const response = await axios.post('http://localhost:3000/student-answer', {
                    questionID: selectedAnswer.questionID,
                    answerID: selectedAnswer.answerID,
                });
    
                const correctAnswerResponse = await axios.get('http://localhost:3000/answers');
                console.log(correctAnswerResponse);

                const questionResponse = await axios.get('http://localhost:3000/questions');
    
                // Create an array to store promises for checking correct answers
                const checkCorrectAnswersPromises = correctAnswerResponse.data.map(async (answer) => {

                    if (answer.answerID === selectedAnswer.answerID && answer.correctAnswer === 1) {
                        return 1;
                    } else {
                        return null;
                    }
                });
    
                // Wait for all promises to resolve
                const tempAnswers = await Promise.all(checkCorrectAnswersPromises);
                setTrackAnswers([...trackAnswers.slice(0, questionNo-1), tempAnswers, ...trackAnswers.slice(questionNo)])
    
                console.log('Track Answers:', trackAnswers);
                console.log(trackAnswers.length);
            } catch (error) {
                console.error('Error saving user answer:', error);
            }
        
    
        setSelectedAnswer({ questionID: null, answerID: null });
        setQuestionNo(questionNo + 1);
    };
    

    const prevQuestion = () => {
        if (questionNo > 1) {
            setQuestionNo(questionNo - 1);
        }
    }

    const handleSubmit = () => {
        localStorage.setItem("AnswerArray", trackAnswers);
        localStorage.setItem("NoOfQuestions", questions.length);

        navigate('/displayResults')
    }

    return (
        <>
            <div className="p-4 flex justify-start">
                <button className="bg-gray-300 px-4 py-2 rounded">Back</button>
            </div>
            {trackAnswers}
            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="w-2/5 p-6 text-center">
                    <p className="text-lg font-semibold">Time Left: 00:15 mins</p>
                    <div className="mt-6">
                        {questions.map((question, index) => (question.examID == examID && (index + 1) == questionNo ? (
                            <>
                                <p className="mt-2 text-l text-left">{question.questionText}</p>
                                < div className="mt-4 space-y-2 border-2 p-[25px]" >
                                    {
                                        answers.map((answer) => (answer.questionID == question.questionID ? (
                                            <label key={answer.id} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    className="form-radio"
                                                    name="answer"
                                                    value={answer.id}
                                                    onChange={() => setSelectedAnswer({ questionID: question.questionID, answerID: answer.answerID })}
                                                />
                                                <span className="ml-2">{answer.answerValue}</span>
                                            </label>
                                        ) : (<></>)
                                        ))
                                    }
                                </div >
                            </>
                        ) : (<></>)
                        ))}

                        <div className="flex justify-center mt-6 space-x-4">
                            <button className="bg-[#9CA3AF] text-black px-4 py-2 rounded w-[220px] h-[40px] mr[100px]" onClick={() => { prevQuestion() }}>Prev</button>
                            <p className="mt-2">Question {questionNo}</p>
                            <button className="bg-[#9CA3AF] text-black px-4 py-2 rounded w-[220px] h-[40px] ml[30px]" onClick={() => { nextQuestion() }} disabled={questionNo >= questions.length+1}>Next</button>
                        </div>
                    </div>
                </div>
            </div >

            <div className="mt-auto">
                <div className="p-4 flex justify-end">
                    <button className="bg-[#31C48D] text-white px-4 py-2 rounded mr-2">Save</button>
                    <button className="bg-[#3F83F8] text-white px-4 py-2 rounded" onClick={() => {handleSubmit()}}>Complete</button>
                </div>
            </div>
        </>
    )
}

export default ExamPaper;