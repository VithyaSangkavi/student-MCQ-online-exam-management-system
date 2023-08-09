
function TeacherInterface() {
    return (
        <>
           <div class="py-4 px-6 flex justify-between items-center">
                <div class="flex items-center">
                    <input type="text"className="py-2 px-3 border-2 border[#1F2937] h-[35px]" />
                    <button class='rounded bg-[#5850EC] pr-10 pl-10 pt-2 pb-2 text-white h-[35px] font-bold ml-[15px]'>Search</button>
                </div>
                <button class="py-2 px-4 bg-[#31C48D] rounded text-white font-bold">New Exam</button>
            </div>

            <div class="m-4">
                <table class="w-full bg-white border-2">
                    <thead>
                        <tr class="bg-[#C3DDFD] border-2">
                            <th class="py-2 px-4 text-left">Exam</th>
                            <th class="py-2 px-4 text-left">Last Updated</th>
                            <th class="py-2 px-4 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-2">
                            <td class="py-2 px-4">Math Exam</td>
                            <td class="py-2 px-4">2023-08-09</td>
                            <td class="py-2 px-4">Active</td>
                        </tr>
                        <tr class="border-2">
                            <td class="py-2 px-4">Science Exam</td>
                            <td class="py-2 px-4">2023-08-08</td>
                            <td class="py-2 px-4">Inactive</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default TeacherInterface;
