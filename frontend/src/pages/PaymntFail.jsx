import crossgif from '../assets/no-cross.gif'
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
export function PaymentFail()
{
    const navigate = useNavigate();
    const [searchParam] = useSearchParams();
    const username = searchParam.get("username");
    const id = searchParam.get("id");
    const name = searchParam.get("name");
    const amount = searchParam.get("amount");
    return <div className="min-h-screen h-max bg-slate-700 flex justify-center ">
    <div className="flex flex-col justify-center">
        <div className="bg-zinc-100 w-80 text-center rounded-lg p-2 h-max px-4">
            <div className='w-20 h-20 rounded-full bg-white mt-5 mb-3 mx-auto shadow-2xl'>
        <img src={crossgif} className='mx-auto' alt=""/>

            </div>
        <div className="font-bold text-3xl  text-green-950">Payment Failed!</div>
            <div className='text-white font-bold flex justify-center flex-col items-center pt-5 pb-8 p-5'>
                <p className='text-slate-500'>Unfortunately your payment request could not be completed. Please try again.</p>
                <p className='text-zinc-800 text-2xl pl-3 pt-3 text-center w-max relative'>{name}
                <p className='text-sm absolute  text-slate-500 underline -bottom-4 font-extrabold text-center w-full'><a href={`mailto:${username}`}>{username}</a></p>
                </p>
            </div>
            <div className='flex items-center w-full justify-center'>

                <span className="text-3xl font-bold text-green-950">₹{amount || 0}</span>
            </div>
            <button onClick={()=>{
                navigate(`/send?id=${id}&username=${username}&name=${name}`)
            }} className='font-bold rounded-lg transition 0.08s shadow-md hover:bg-blue-950 mt-5 text-xl text-white bg-blue-500 w-full py-2 px-2'><i>Try Again</i></button>
        </div>
    </div>
</div>
}