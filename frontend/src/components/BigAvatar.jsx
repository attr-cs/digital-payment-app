
export function BigAvatar({text})
{
    return <>
    <div className={"hover:bg-cyan-800 cursor-pointer transition 0.3s ease-in-out w-10 relative h-10 bg-slate-800 border-2 border-slate-700 rounded-full flex justify-center items-center "}>{text}
    <div className={`absolute h-[30%] border-2 border-slate-200 w-[30%] rounded-full bg-green-400 top-0 right-0`}></div>
    </div>
    </> 
}