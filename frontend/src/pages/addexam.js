function AddExam() {
    return (
        <>
            <div className="flex">

                <div className="w-2/3 bg-white p-4">
                    <button className="bg-gray-300 px-4 py-2 rounded-md">Exam Name</button> <br/> <br/>
                    <div className="flex justify-between items-center">
                    <h2 className="mt-4">Question List</h2>
                    <button className="bg-[#C81E1E] text-white font-bold px-4 py-2 rounded w-[270px]">Add Question</button>
                </div>
                <div className="mt-4">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-[#C3DDFD]">
                                <th claNamess="p-2 text-left">Question</th>
                                <th className="p-2 text-left">Answer</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 border-t border-gray-300">Sample Question 1</td>
                                <td className="p-2 border-t border-gray-300">Sample Answer 1</td>
                            </tr>
                            <tr>
                                <td className="p-2 border-t border-gray-300">Sample Question 2</td>
                                <td className="p-2 border-t border-gray-300">Sample Answer 2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br/>
                <div className="flex items-center mt-4">
                    <input type="number" className="border border-gray-300 px-3 py-2 mr-8 rounded w-[350px]" placeholder="Exam Date Time" />
                    <input type="number" className="border border-gray-300 px-3 py-2 mr-16 rounded w-[350px]" placeholder="Exam Duration." />
                    <button className="bg-[#6C2BD9] text-white px-4 py-2 rounded font-bold w-[300px]">Publish Paper</button>
                </div>
            </div>

            <div className="w-1/3 bg-white p-4">
                <form className="border-2 p-[20px] h-[550px]">
                    <div className="mb-3">
                    <input type="text" className="w-full border border-gray-300 px-3 py-2 rounded" placeholder="Question name" />
                    </div>
                    <br/>
                    <div className="mb-3">
                        <label for="answer1" className="block mb-1">Answer List</label> <br/>
                        <input type="text" id="answer1" className="w-full border border-gray-300 px-3 py-2 rounded mb-[20px]" placeholder="Answer 1"/> 
                        <input type="text" id="answer2" className="w-full border border-gray-300 px-3 py-2 rounded mb-[20px]" placeholder="Answer 2" />
                        <input type="text" id="answer2" className="w-full border border-gray-300 px-3 py-2 rounded mb-[20px]" placeholder="Answer 3" />
                        <input type="text" id="answer2" className="w-full border border-gray-300 px-3 py-2 rounded mb-[20px]" placeholder="Answer 4" />
                    </div>
                    
                    <br/> <br/> <br/> 
                    <button type="submit" className="bg-[#31C48D] text-white font-bold px-4 py-2 rounded float-right">Save</button>
                </form>
            </div>
        </div >
        </>
    )
}

export default AddExam;