function StudentInterface(){
    return(
        <>
        <div class="py-4 px-6 flex justify-between items-center">
                <div class="flex items-center">
                    <input type="text"className="py-2 px-3 border-2 border[#1F2937] h-[35px]" />
                    <button class='rounded bg-[#5850EC] pr-10 pl-10 pt-2 pb-2 text-white h-[35px] font-bold ml-[15px]'>Search</button>
                </div>
            </div>

            <div class="m-4">
                <table class="w-full bg-white border-2">
                    <thead>
                        <tr class="bg-[#C3DDFD] border-2">
                            <th class="py-2 px-4 text-left">Exam</th>
                            <th class="py-2 px-4 text-left">Starting Time</th>
                            <th class="py-2 px-4 text-left">Exam Duration</th>
                            <th class="py-2 px-4 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-2">
                            <td class="py-2 px-4">Math Exam</td>
                            <td class="py-2 px-4">2023-08-09 09.00am</td>
                            <td class="py-2 px-4">60 minutes</td>
                            <td class="py-2 px-4">Attended</td>
                        </tr>
                        <tr class="border-2">
                            <td class="py-2 px-4">Science Exam</td>
                            <td class="py-2 px-4">2023-08-08 10.00am</td>
                            <td class="py-2 px-4">30 minutes</td>
                            <td class="py-2 px-4">Pending</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default StudentInterface;