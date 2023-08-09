function DisplayResults() {
    return (
        <>
            <div className="p-4 flex justify-start">
                <button className="bg-gray-300 px-4 py-2 rounded">Back</button>
            </div>
                <div className="flex-grow flex items-center justify-center">
                    <div className="w-2/5 p-8 border-2">
                        <p className="text-lg">Exam Completed</p>
                        <p className="text-5xl text-[#31C48D] text-center mt-4">Passed</p>
                        <p className="text-lg font-semibold text-center mt-4">A - 89 Points</p>
                    </div>
                </div>

                <div className="mt-8 flex-grow flex items-center justify-center">
                <div className="w-2/5 p-8 border-2">
                    <p className="text-lg font-semibold">Questions</p>
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                            <p className="font-semibold">Question 1</p>
                            <p className="text-[#31C48D] ml-[400px] font-semibold">Correct</p>
                        </div>
                        <div className="flex items-center">
                            <p className="font-semibold">Question 2</p>
                            <p className="text-red-600 ml-[400px] font-semibold">Wrong</p>
                        </div>
                    </div>
                </div>
                </div>
                <div className="flex-grow flex items-left justify-center">
                <div className="w-2/5">
                <button className="bg-[#9CA3AF] text-black px-4 py-2 rounded mt-8 self-end w-[150px]">Close</button>
                </div>
            
          </div>
        </>
    )
}

export default DisplayResults;