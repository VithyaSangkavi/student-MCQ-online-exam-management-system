function AddExam() {
    return (
        <>
            <div class="flex">

                <div class="w-2/3 bg-white p-4">
                    <button class="bg-gray-300 px-4 py-2 rounded-md">Exam Name</button> <br/> <br/>
                    <div class="flex justify-between items-center">
                    <h2 class="mt-4">Question List</h2>
                    <button class="bg-[#C81E1E] text-white font-bold px-4 py-2 rounded w-[270px]">Add Question</button>
                </div>
                <div class="mt-4">
                    <table class="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr class="bg-[#C3DDFD]">
                                <th class="p-2 text-left">Question</th>
                                <th class="p-2 text-left">Answer</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="p-2 border-t border-gray-300">Sample Question 1</td>
                                <td class="p-2 border-t border-gray-300">Sample Answer 1</td>
                            </tr>
                            <tr>
                                <td class="p-2 border-t border-gray-300">Sample Question 2</td>
                                <td class="p-2 border-t border-gray-300">Sample Answer 2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br/>
                <div class="flex items-center mt-4">
                    <input type="number" class="border border-gray-300 px-3 py-2 mr-8 rounded w-[350px]" placeholder="Exam Date Time" />
                    <input type="number" class="border border-gray-300 px-3 py-2 mr-16 rounded w-[350px]" placeholder="Exam Duration." />
                    <button class="bg-[#6C2BD9] text-white px-4 py-2 rounded font-bold w-[300px]">Publish Paper</button>
                </div>
            </div>

            <div class="w-1/3 bg-white p-4">
                <form className="border-2 p-[20px] h-[550px]">
                    <div class="mb-3">
                    <input type="text" class="w-full border border-gray-300 px-3 py-2 rounded" placeholder="Question name" />
                    </div>
                    <br/>
                    <div class="mb-3">
                        <label for="answer1" class="block mb-1">Answer List</label> <br/>
                        <input type="text" id="answer1" class="w-full border border-gray-300 px-3 py-2 rounded mb-[20px]" placeholder="Answer 1"/> 
                        <input type="text" id="answer2" class="w-full border border-gray-300 px-3 py-2 rounded mb-[20px]" placeholder="Answer 2" />
                        <input type="text" id="answer2" class="w-full border border-gray-300 px-3 py-2 rounded mb-[20px]" placeholder="Answer 3" />
                        <input type="text" id="answer2" class="w-full border border-gray-300 px-3 py-2 rounded mb-[20px]" placeholder="Answer 4" />
                    </div>
                    
                    <br/> <br/> <br/> 
                    <button type="submit" class="bg-[#31C48D] text-white font-bold px-4 py-2 rounded float-right">Save</button>
                </form>
            </div>
        </div >
        </>
    )
}

export default AddExam;