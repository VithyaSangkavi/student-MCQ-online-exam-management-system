function ExamPaper() {
    return (
        <>
            <div className="p-4 flex justify-start">
                <button className="bg-gray-300 px-4 py-2 rounded">Back</button>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="w-2/5 p-6 text-center">
                    <p className="text-lg font-semibold">Time Left: 00:15 mins</p>
                    <div className="mt-6">
                        <p className="mt-2 text-l text-left">Q1: What is question one?</p>
                        <div className="mt-4 space-y-2 border-2 p-[25px]">
                            <label className="flex items-center">
                                <input type="radio" className="form-radio" name="answer" value="answer 1" />
                                <span className="ml-2">Answer 1</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" className="form-radio" name="answer" value="answer 2" />
                                <span className="ml-2">Answer 2</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" className="form-radio" name="answer" value="answer 3" />
                                <span className="ml-2">Answer 3</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" className="form-radio" name="answer" value="answer 4" />
                                <span className="ml-2">Answer 4</span>
                            </label>
                        </div>
                        <div className="flex justify-center mt-6 space-x-4">
                            <button className="bg-[#9CA3AF] text-black px-4 py-2 rounded w-[220px] h-[40px] mr[100px]">Prev</button>
                            <p className="mt-2">Question 1</p>
                            <button className="bg-[#9CA3AF] text-black px-4 py-2 rounded w-[220px] h-[40px] ml[30px]">Next</button>
                        </div>
                    </div>
                </div>
            </div>

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