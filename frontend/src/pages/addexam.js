import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddExam() {
    const navigate = useNavigate();

    const [examID, setExamID] = useState(localStorage.getItem("ExamID"));
    const [examName, setExamName] = useState('');
    const [startDateAndTime, setStartDateAndTime] = useState('');
    const [duration, setDuration] = useState('');
    const [examStatus, setExamStatus] = useState('');
    const [questionNo, setQuestionNo] = useState('');
    const [questionText, setQuestionText] = useState('');

    const [answerValue, setAnswerValue] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState(-1);

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

    //Handle answers 

    const handleAnswerChange = (index, value) => {
        const newAnswerValue = [...answerValue];
        newAnswerValue[index] = value;
        setAnswerValue(newAnswerValue);
    };

    const handleCorrectAnswerChange = (index) => {
        setCorrectAnswer((prevIndex) => (prevIndex === index ? -1 : index));
    };

    //Add questions and answers

    const handleAddQuestion = async (e) => {
        e.preventDefault();

        console.log('Question Text:', questionText);
        console.log('Answer Values:', answerValue);
        console.log('Correct Answer:', correctAnswer);

        try {
            const questionData = {
                questionText: questionText,
                examID: examID
            };

            const response = await axios.post('http://localhost:3000/questions', questionData);
            console.log('Question added:', response.data);

            const questionID = response.data.questionID;

            const answerPromises = answerValue.map((answer, index) => {
                const answerData = {
                    answerValue: answer,
                    questionID: questionID,
                    correctAnswer: index === correctAnswer // Mark correct answer
                };
                return axios.post('http://localhost:3000/answers', answerData);
            });

            const responses = await Promise.all(answerPromises);
            console.log('Answers added:', responses.map((response) => response.data));

        } catch (error) {
            console.error('Error adding question:', error);
        }

        setAnswerValue(['', '', '', '']);
        setQuestionText('');
        setCorrectAnswer(-1)
    };


    //Add exam 

    const handleAddExam = async () => {
        try {
            const examData = {
                examName: examName,
                startDateAndTime: startDateAndTime,
                duration: duration,
                examStatus: 'Published'
            };

            const response = await axios.post('http://localhost:3000/exams', examData);
            console.log('Exam added:', response.data);
        } catch (error) {
            console.error('Error adding exam:', error);
        }

        setStartDateAndTime('');
        setDuration('');
        setExamName('');

        navigate('/teacherInterface');
    };

    return (
        <>
            <div className="flex">

                <div className="w-2/3 bg-white p-4">
                    {/* <button className="bg-gray-300 px-4 py-2 rounded-md">Exam Name</button> <br /> <br /> */}
                    <input type='text' className='border-0' placeholder='Exam Name' value={examName} onChange={(e) => setExamName(e.target.value)}/>
                    <div className="flex justify-between items-center">
                        <h2 className="mt-4">Question List</h2>
                        <button className="bg-[#C81E1E] text-white font-bold px-4 py-2 rounded w-[270px]">Add Question</button>
                    </div>
                    <div className="mt-4">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-[#C3DDFD]">
                                    <th className="p-2 text-left">Question</th>
                                    <th className="p-2 text-left">Answer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((question) => ( question.examID && question.examID == examID ? (
                                    <tr key={question.id}>
                                        <td className="p-2 border-t border-gray-300">{question.questionText}</td>
                                        <td className="p-2 border-t border-gray-300"><div className='grid'>{answers.map((answer) => (<div> {answer.questionID === question.questionID ? answer.answerValue : null}</div>))}</div></td>
                                    </tr>
                                ) : (<></>)
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div className="flex items-center mt-4">
                        <input type="datetime-local" className="border border-gray-300 px-3 py-2 mr-8 rounded w-[350px]" placeholder="Exam Date Time" value={startDateAndTime} onChange={(e) => setStartDateAndTime(e.target.value)} />
                        <input type="number" className="border border-gray-300 px-3 py-2 mr-16 rounded w-[350px]" placeholder="Exam Duration." value={duration} onChange={(e) => setDuration(e.target.value)} />
                        <button className="bg-[#31C48D] text-white px-4 py-2 rounded font-bold w-[300px] mr-16" >Save as draft</button>
                        <button className="bg-[#6C2BD9] text-white px-4 py-2 rounded font-bold w-[300px]" onClick={handleAddExam}>Publish Paper</button>
                    </div>
                </div>

                <div className="w-1/3 bg-white p-4">
                    <form className="border-2 p-[20px] h-[550px]">
                        <div className="mb-3">
                            <input type="text" className="w-full border border-gray-300 px-3 py-2 rounded" placeholder="Question name" value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
                        </div>
                        <br />

                        <div className="mb-3">
                            <label for="answer1" className="block mb-1">Answer List</label> <br />
                            {answerValue.map((value, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        id={`answer${index + 1}`}
                                        className={`w-full border border-gray-300 px-3 py-2 rounded mb-[20px] ${correctAnswer === index ? 'bg-green-100' : ''
                                            }`}
                                        placeholder={`Answer ${index + 1}`}
                                        value={value}
                                        onClick={() => handleCorrectAnswerChange(index)}
                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>

                        <br /> <br /> <br />
                        <button type="submit" onClick={handleAddQuestion} className="bg-[#31C48D] text-white font-bold px-4 py-2 rounded float-right">Save</button>
                    </form>
                </div>
            </div >
        </>
    )
}

export default AddExam;