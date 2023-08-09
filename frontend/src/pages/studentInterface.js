function StudentInterface(){
    return(
        <>
        <div className="py-4 px-6 flex justify-between items-center">
                <div className="flex items-center">
                    <input type="text"className="py-2 px-3 border-2 border[#1F2937] h-[35px]" />
                    <button className='rounded bg-[#5850EC] pr-10 pl-10 pt-2 pb-2 text-white h-[35px] font-bold ml-[15px]'>Search</button>
                </div>
            </div>

            <div className="m-4">
                <table className="w-full bg-white border-2">
                    <thead>
                        <tr className="bg-[#C3DDFD] border-2">
                            <th className="py-2 px-4 text-left">Exam</th>
                            <th className="py-2 px-4 text-left">Starting Time</th>
                            <th className="py-2 px-4 text-left">Exam Duration</th>
                            <th className="py-2 px-4 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-2">
                            <td className="py-2 px-4">Math Exam</td>
                            <td className="py-2 px-4">2023-08-09 09.00am</td>
                            <td className="py-2 px-4">60 minutes</td>
                            <td className="py-2 px-4">Attended</td>
                        </tr>
                        <tr className="border-2">
                            <td className="py-2 px-4">Science Exam</td>
                            <td className="py-2 px-4">2023-08-08 10.00am</td>
                            <td className="py-2 px-4">30 minutes</td>
                            <td className="py-2 px-4">Pending</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default StudentInterface;