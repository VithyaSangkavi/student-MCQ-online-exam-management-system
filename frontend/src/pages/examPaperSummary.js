function ExamPaperSummary() {
    return (
        <>
            {/* <div class="flex flex-col h-screen p-8"> */}
            <div className="p-4 flex justify-start">
                <button className="bg-gray-300 px-4 py-2 rounded">Back</button>
            </div>
            <div class="flex mt-8 ml-4">
                <div class="w-3/5 mr-4">
                    <div class="border-2 p-[20px]">
                        <p class="font-semibold">Exam completed</p>
                        <p class="text-center text-7xl">10/20 </p>
                        <p class="text-center mt-4">Time left: 00:30 mins</p>
                    </div>
                    <div class="border-2 p-[20px] h-[200px] mt-6">
                        <p class="font-semibold">Exam started time:</p>
                        <p class="font-semibold mt-2">Exam ending time:</p>
                    </div>
                </div>

                <div class="w-2/5 border-2 p-[20px] mr-4">
                    <p className="font-semibold">Attending Students List</p>
                    <div class="flex border-2 p-[10px] mt-6">
                        <p>Student 1</p>
                    </div>
                    <div class="flex border-2 p-[10px] mt-6">
                        <p>Student 2</p>
                        <p className="ml-[350px] text-[#31C48D] font-bold">Completed</p>
                    </div>
                    <div class="flex border-2 p-[10px] mt-6">
                        <p>Student 3</p>
                    </div>
                </div>
            </div>
            <div class="flex justify-end mt-8">
                <button className="bg-[#C81E1E] text-white font-bold px-4 py-2 rounded mt-4 mr-[20px] w-[150px]">End Exam</button>
            </div>
        </>
    )
}

export default ExamPaperSummary;