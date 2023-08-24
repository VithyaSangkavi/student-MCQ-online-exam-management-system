import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DisplayResults() {

    const navigate = useNavigate('');

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    }

    const [answerArray, setAnswerArray] = useState(localStorage.getItem("AnswerArray"));
    const [noOfQuestions, setNoOfQuestions] = useState(localStorage.getItem("NoOfQuestions"));
    const [formatedMarks, setFormatedMarks] = useState(0);
    const [grade, setGrade] = useState("");
    const [calculatedGrade, setCalculatedGrade] = useState('')
    const [results, setResults] = useState('')

    const [questionResults, setQuestionResults] = useState({});
    
    useEffect(() => {
        const unfilteredArray = answerArray.split(',');
        console.log('unfilter '+unfilteredArray)
        const array = unfilteredArray.filter(item => item !== null);
        console.log('New array '+array)

        let count = 0;

        array.map((i) => {
            if (i == 1) {
                count++;
            }
        })

        let marks = count / parseInt(noOfQuestions) * 100;
        let formatedMarks = parseFloat(marks.toFixed(2))
        setFormatedMarks(formatedMarks)
        console.log(formatedMarks)

        let calculatedGrade = "";
        if (formatedMarks >= 85 && formatedMarks <= 100) {
            calculatedGrade = "A";
        } else if (formatedMarks >= 65 && formatedMarks < 85) {
            calculatedGrade = "B";
        } else if (formatedMarks >= 45 && formatedMarks < 65) {
            calculatedGrade = "C";
        } else {
            calculatedGrade = "F";
        }

        setCalculatedGrade(calculatedGrade);

        let results = "";
        if (calculatedGrade == "A" || calculatedGrade == "B" || calculatedGrade == "C") {
            results = "Passed";
        } else {
            results = "Failed";
        }

        setResults(results);
        let questionResultsMap = {};
        let questionIndex = 1;
        array.forEach((answer) => {
            if(answer === '1' || answer === '0') {
                questionResultsMap[questionIndex] = answer === '1' ? 'Correct' : answer === '0' ? 'Wrong' : '';
                questionIndex++;
            }
        });
        setQuestionResults(questionResultsMap); // Set questionResults here

    }, [answerArray, noOfQuestions]);

    const addResults = async () => {
        const userID = localStorage.getItem('userID');
        const examID = localStorage.getItem('StuExamID')
        try {
            const resultsData = {
                marks: formatedMarks,
                examStatusStudent: 'Completed',
                examID: examID,
                userID: userID
            };

            const response = await axios.post('http://localhost:3000/results', resultsData, config);
            console.log('Results added:', response.data);

            navigate('/studentInterface');

        } catch (error) {
            console.error('Error adding results:', error);
        }
    };

    return (
        <>
            <div className="p-4 flex justify-start">
                <button className="bg-gray-300 px-4 py-2 rounded">Back</button>
            </div>
            <div className="flex-grow flex items-center justify-center">
                <div className="w-2/5 p-8 border-2">
                    <p className="text-lg">Exam Completed</p>
                    <p className={`text-5xl text-center mt-4 ${results === "Passed" ? "text-[#31C48D]" : "text-red-600"}`}>{results}</p>
                    <p className="text-lg font-semibold text-center mt-4">{calculatedGrade} - {formatedMarks} Points</p>
                </div>
            </div>

            <div className="mt-8 flex-grow flex items-center justify-center">
                <div className="w-2/5 p-8 border-2">
                    <p className="text-lg font-semibold">Questions</p>
                    <div className="mt-4 space-y-2">
                        {Object.keys(questionResults).map((questionID) => (
                            <div key={questionID} className="flex items-center">
                                <p className="font-semibold">{`Question ${questionID}`}</p>
                                <p className={`ml-[400px] font-semibold ${questionResults[questionID] === 'Correct' ? 'text-[#31C48D]' : 'text-red-600'}`}>
                                    {questionResults[questionID]}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex-grow flex items-left justify-center">
                <div className="w-2/5">
                    <button onClick={() => { addResults() }} className="bg-[#9CA3AF] text-black px-4 py-2 rounded mt-8 self-end w-[150px]">Close</button>
                </div>

            </div>
        </>
    )
}

export default DisplayResults;