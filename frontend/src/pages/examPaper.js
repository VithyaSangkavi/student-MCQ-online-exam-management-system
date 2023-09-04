import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ExamPaper() {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const [examID, setExamID] = useState(localStorage.getItem("StuExamID"));
    const [questionNo, setQuestionNo] = useState(1);
    const [selectedAnswer, setSelectedAnswer] = useState({ questionID: null, answerID: null });
    const [trackAnswers, setTrackAnswers] = useState([]);
    const [questionID, setQuestionID] = useState('');

    const [examEnded, setExamEnded] = useState(false);

    const navigate = useNavigate();

    //Fetch Questions

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, [questions]);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${apiUrl}/questions`, config);

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
            const response = await axios.get(`${apiUrl}/answers`, config);
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
            const response = await axios.post(`${apiUrl}/student-answer`, {
                questionID: selectedAnswer.questionID,
                answerID: selectedAnswer.answerID,
            }, config);

            const correctAnswerResponse = await axios.get(`${apiUrl}/answers`, config);
            console.log(correctAnswerResponse);

            const questionResponse = await axios.get(`${apiUrl}/questions/exam/${examID}`, config).then((res) => {
                return res.data
            })

            let questionForExam = []

            questionResponse.map((item) => {
                questionForExam = ([...questionForExam, item.questionID])
            })

            console.log(questionForExam)

            // Create an array to store promises for checking correct answers
            const checkCorrectAnswersPromises = correctAnswerResponse.data.map(async (answer) => {

                if (questionForExam.some(item => item == answer.questionID)) {
                    if (answer.answerID === selectedAnswer.answerID) {
                        if (answer.correctAnswer === 1) {
                            return 1;
                        } else {
                            return 0;
                        }
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }

            });

            // Wait for all promises to resolve
            const tempAnswers = await Promise.all(checkCorrectAnswersPromises);
            setTrackAnswers([...trackAnswers.slice(0, questionNo - 1), tempAnswers, ...trackAnswers.slice(questionNo)])

            console.log('Track Answers:', trackAnswers);
            console.log(trackAnswers.length);
        } catch (error) {
            console.error('Error saving user answer:', error);
        }

        setSelectedAnswer({ questionID: null, answerID: null });
        setQuestionNo(questionNo + 1);

        if (questionNo >= questions.length) {
            setExamEnded(true);
        } else {
            // Proceed to the next question
            setSelectedAnswer({ questionID: null, answerID: null });
            setQuestionNo(questionNo + 1);
        }
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

    //Time

    const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        const fetchTargetTimeFromDatabase = async () => {
            try {
                const endTime = localStorage.getItem('endTime');
                console.log(endTime);

                if (endTime) {
                    const now = new Date();
                    const targetTime = new Date(endTime);

                    const timeRemaining = targetTime - now;
                    console.log('Time Reamining: ', timeRemaining)

                    if (timeRemaining > 0) {
                        const interval = setInterval(() => {
                            const now = new Date();
                            const timeRemaining = targetTime - now;

                            if (timeRemaining <= 0) {
                                clearInterval(interval);
                                handleSubmit();
                                console.log("Function executed!");
                            } else {
                                const time = formatTime(timeRemaining);
                                setCountdown(time);
                            }
                        }, 1000);

                        return () => {
                            clearInterval(interval);
                        };
                    }
                }
            } catch (error) {
                console.error('Error fetching target time:', error);
            }
        };

        fetchTargetTimeFromDatabase();
    }, []);

    const formatTime = (ms) => {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
        return `${hours.toString().padStart(2, '0')}:
                ${minutes.toString().padStart(2, '0')}:
                ${seconds.toString().padStart(2, '0')}`;
    };



    return (
        <>
            <div className="p-4 flex justify-start">
                <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => navigate('/studentInterface')} >Back</button>
            </div>
            {trackAnswers}
            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="w-2/5 p-6 text-center">
                    <p className="text-lg font-semibold">Time Left: {countdown}</p>
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

                        {examEnded && (
                            <div className="text-center">
                                <p className="mt-6 text-xl font-semibold">End of Exam</p>
                                <p>You have completed the exam.</p>
                            </div>
                        )}

                        <div className="flex justify-center mt-6 space-x-4">
                            <button className="bg-[#9CA3AF] text-black px-4 py-2 rounded w-[220px] h-[40px] mr[100px]" onClick={() => { prevQuestion() }}>Prev</button>
                            <p className="mt-2">Question {questionNo}</p>
                            <button className="bg-[#9CA3AF] text-black px-4 py-2 rounded w-[220px] h-[40px] ml[30px]" onClick={() => { nextQuestion() }} disabled={questionNo >= questions.length + 1}>Next</button>
                        </div>
                    </div>
                </div>
            </div >

            <div className="mt-auto">
                <div className="p-4 flex justify-end">
                    <button className="bg-[#31C48D] text-white px-4 py-2 rounded mr-2">Save</button>
                    <button className="bg-[#3F83F8] text-white px-4 py-2 rounded" onClick={() => { handleSubmit() }}>Complete</button>
                </div>
            </div>
        </>
    )
}

export default ExamPaper;