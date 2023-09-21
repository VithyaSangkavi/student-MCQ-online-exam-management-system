import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function AddExam() {
    //Getting the localhost url from .env
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const navigate = useNavigate();

    //Header configuration
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    //Declaring states
    const [userID, setUserID] = useState(localStorage.getItem("userID"));
    const [examID, setExamID] = useState(localStorage.getItem("ExamID"));
    const [examName, setExamName] = useState('');
    const [startDateAndTime, setStartDateAndTime] = useState('');
    const [duration, setDuration] = useState('');
    const [examStatus, setExamStatus] = useState('');
    const [questionNo, setQuestionNo] = useState(1);
    const [questionText, setQuestionText] = useState('');

    const [answerValue, setAnswerValue] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState(-1);

    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [selectedQuestionID, setSelectedQuestionID] = useState('');
    const [selectedAnswerID, setSelectedAnswerID] = useState([]);
    
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    
    const thisExamName = localStorage.getItem("examName");

    //Fetch Questions
    useEffect(() => {
        fetchQuestions();
    }, [questions]);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${apiUrl}/questions`, config);
            // console.log('Fetched questions:', response.data);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    //Fetch Answers
    const fetchAnswers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/answers`, config);
            // console.log('Fetched answers:', response.data);
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

    //Handle correct answer
    const handleCorrectAnswerChange = (index) => {
        setCorrectAnswer((prevIndex) => (prevIndex === index ? -1 : index));
    };

    //Add questions and answers
    const handleAddQuestion = async (e) => {
        e.preventDefault();

        // console.log('Question Text:', questionText);
        // console.log('Answer Values:', answerValue);
        // console.log('Correct Answer:', correctAnswer);

        // select correct answer select validation
        if (correctAnswer === -1) {
            alert('Please select the correct answer before adding the question.');
            return;
        }

        try {
            const questionData = {
                questionText: questionText,
                examID: examID,
                questionNo: questionNo
            };

            const response = await axios.post(`${apiUrl}/questions`, questionData, config);
            console.log('Question added:', response.data);

            const questionID = response.data.questionID;

            const answerPromises = answerValue.map((answer, index) => {
                const answerData = {
                    answerValue: answer,
                    questionID: questionID,
                    correctAnswer: index === correctAnswer
                };
                return axios.post(`${apiUrl}/answers`, answerData, config);
            });

            const responses = await Promise.all(answerPromises);
            console.log('Answers added:', responses.map((response) => response.data));

            setQuestionNo(questionNo + 1);

            setQuestionText('');
            setSelectedQuestion('');
        } catch (error) {
            console.error('Error adding question:', error);
        }

        setAnswerValue(['', '', '', '']);
        setQuestionText('');
        setCorrectAnswer(-1)
    };


    //Add exam 
    const handleAddExam = async () => {
        //exam name validation
        if (!examName.trim()) {
            alert('Please provide an exam name before publishing.');
            return;
        }

        //correct answer select validation
        if (questions.some((question) => question.examID == examID && question.correctAnswer === -1)) {
            alert('Please select the correct answer for all questions before adding the exam.');
            return;
        }

        try {
            const examData = {

                examName: examName,
                startDateAndTime: startDateAndTime,
                duration: duration,
                examStatus: 'Published',
                userID: userID
            };

            const response = await axios.put(`${apiUrl}/exams/${examID}`, examData, config);
            console.log('Exam added:', response.data);
        } catch (error) {
            console.error('Error adding exam:', error);
        }

        setStartDateAndTime('');
        setDuration('');
        setExamName('');

        navigate('/teacherInterface');
    };

    //saving the exam without publishing
    const saveExam = async () => {
        //exam name validation
        if (!examName.trim()) {
            alert('Please provide an exam name before saving.');
            return;
        }

        try {
            const examData = {
                examName: examName,
                startDateAndTime: startDateAndTime,
                duration: duration,
                examStatus: 'Draft',
                userID: userID
            };

            const response = await axios.post(`${apiUrl}/exams`, examData, config);
            console.log('Exam added:', response.data);
        } catch (error) {
            console.error('Error adding exam:', error);
        }

        navigate('/teacherInterface');
    }

    const viewSummary = async () => {
        localStorage.setItem('viewSummaryExamID', examID);
        localStorage.setItem('viewSummaryUserID', userID);
        navigate('/examPaperSummary');
    }

    //Clickable table row to fetch questions and answers
    const handleTableRowClick = (question) => {
        setSelectedQuestion(question);
        const questionAnswers = answers.filter((answer) => answer.questionID === question.questionID);
        setSelectedAnswers(questionAnswers);
        setQuestionText(question.questionText);

        setSelectedQuestionID(question.questionID);
        setSelectedAnswerID(questionAnswers);

        console.log('QuestionID : ', question.questionID)
        console.log('AnswerID : ', questionAnswers)

        setCorrectAnswer(-1); // Reset the correct answer selection
        setAnswerValue(questionAnswers.map((answer) => answer.answerValue));
    };
    
    //Handle edit question
    const handleEditQuestion = async (e) => {
        e.preventDefault();

        // select correct answer select validation
        if (correctAnswer === -1) {
            alert('Please select the correct answer before adding the question.');
            return;
        }

        try {
            const questionData = {
                questionText: questionText,
                examID: examID,
                questionNo: questionNo
            };

            const response = await axios.put(`${apiUrl}/questions/${selectedQuestionID}`, questionData, config);
            console.log('Question edited:', response.data);

            const questionID = response.data.questionID;
            console.log(answerValue)

            const answerPromises = answerValue.map((answer, index) => {
                console.log('Checking........')
                const answerData = {
                    answerValue: answer,
                    questionID: questionID,
                    correctAnswer: index === correctAnswer
                };
                console.log(selectedAnswerID[index])
                return axios.put(`${apiUrl}/answers/${selectedAnswerID[index].answerID}`, answerData, config);
            });

            const responses = await Promise.all(answerPromises);
            console.log('Answers edited:', responses.map((response) => response.data));

            setQuestionNo(questionNo + 1);

            setQuestionText('');
            setSelectedQuestion('');
        } catch (error) {
            console.error('Error editing question and answer:', error);
        }

        setAnswerValue(['', '', '', '']);
        setQuestionText('');
        setCorrectAnswer(-1)
    };

    return (
        <>
            <div className="flex">

                <div className="w-2/3 bg-white p-4">
                    {/* <button className="bg-gray-300 px-4 py-2 rounded-md">Exam Name</button> <br /> <br /> */}
                    <button className="bg-gray-300 px-2 py-0 rounded" onClick={() => navigate('/teacherInterface')} >Back</button> <br></br>
                    <input type='text' className='border-0' placeholder={thisExamName} value={examName} onChange={(e) => setExamName(e.target.value)} />
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
                                {questions.map((question, index) => (question.examID && question.examID == examID ? (
                                    <tr key={question.id} onClick={() => handleTableRowClick(question)}>
                                        <td className="p-2 border-t border-gray-300">
                                            {question.questionNo})   {question.questionText}
                                        </td>
                                        {/* <td className="p-2 border-t border-gray-300"><div className='grid'>{answers.map((answer) => (<div> {answer.questionID === question.questionID ? answer.answerValue : null}</div>))}</div></td> */}
                                        <td className={`p-2 border-t border-gray-300`}>
                                            <div className="grid">
                                                {answers.map((answer) => (
                                                    answer.questionID === question.questionID && (
                                                        <div
                                                            key={answer.id}
                                                            className={`answer ${answer.correctAnswer === 1 ? 'bg-green-100' : ''}`}
                                                        >
                                                            {answer.answerValue}
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        </td>
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
                        <button className="bg-[#31C48D] text-white px-4 py-2 rounded font-bold w-[300px] mr-[40px]" onClick={saveExam}>Save Paper</button>
                        <button className="bg-[#6C2BD9] text-white px-4 py-2 rounded font-bold w-[300px]" onClick={handleAddExam}>Publish Paper</button>
                    </div>
                </div>

                <div className="w-1/3 bg-white p-4">
                    <form className="border-2 p-[20px] h-[450px]">
                        <div className="mb-3">
                            <input type="text" className="w-full border border-gray-300 px-3 py-2 rounded" placeholder="Question name"  value={selectedQuestion ? selectedQuestion.questionText : questionText} onChange={(e) => {setQuestionText(e.target.value); setSelectedQuestion(e.target.value)}} />
                        </div>
                        <br />

                        <div className="mb-3">
                            <label htmlFor="answer1" className="block mb-1">Answer List</label>
                            {answerValue.map((value, index) => (
                                <div key={index} className="flex items-center mb-3">
                                    <input
                                        type="text"
                                        id={`answer${index + 1}`}
                                        className={`w-full border border-gray-300 px-3 py-2 rounded ${correctAnswer === index ? 'bg-green-100' : ''}`}
                                        placeholder={`Answer ${index + 1}`}
                                        value={selectedQuestion ? answerValue[index] : value}
                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    />
                                    <input
                                        type="radio"
                                        name="correctAnswer"
                                        checked={correctAnswer === index}
                                        onChange={() => handleCorrectAnswerChange(index)}
                                    />

                                </div>
                            ))}
                        </div>

                        <br />
                        
                        <button type="submit" onClick={handleAddQuestion} className="bg-[#31C48D] text-white font-bold px-4 py-2 rounded float-right">Save</button>
                        <button type="submit" onClick={handleEditQuestion} className="bg-[#FACA15] text-white font-bold px-4 py-2 rounded float-right mr-6">Edit</button>
                    </form>
                    <br />
                    <button type="submit" onClick={viewSummary} className='bg-[blue] text-white  font-bold px-4 py-2 rounded float-right'>View Summary</button>
                </div>
            </div >
        </>
    )
}

export default AddExam;