import donegif from '../assets/verify.gif'
import { RecoilRoot, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { balanceAtom } from '../store/atoms/atom';
export function PaymentDone() {
    const [searchParam] = useSearchParams();
    const username = searchParam.get("username");
    const id = searchParam.get("id");
    const toName = searchParam.get("name");
    const amount = searchParam.get("amount");
    const remained = searchParam.get("remained");
    return <RecoilRoot>
        <PaymentSubComponent username={username}  toName={toName} amount={amount} donegif={donegif} />
    </RecoilRoot>
}

function PaymentSubComponent({ username, toName, amount,donegif }) {
    const date = new Date();
    const realDate = date.getDate() +"/" + date.getUTCMonth() +"/"+ date.getFullYear()
    const time = date.getHours() + ":" +(date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) ;
    const navigate = useNavigate();
    const [balance,setBalance] = useRecoilState(balanceAtom);
    useEffect(()=>{
        const getBalance = async ()=>{
                const res = await fetch('http://localhost:3000/api/v1/account/balance',{method:'GET',headers:{authorization:`Bearer ${localStorage.token}`}});
                const data = await res.json();
                setBalance(data.balance);
        }
        getBalance();
    },[setBalance])
    return <div className="min-h-screen h-max py-10 px-2 bg-slate-700 flex justify-center ">
        <div className="flex flex-col justify-center">
            <div className="bg-zinc-100 w-80 text-center rounded-lg p-2 h-max px-4">

                <img src={donegif} className=' w-20 h-20 rounded-full drop-shadow-xl mt-5 mb-3 mx-auto ' alt="" />

                <div className="font-bold text-3xl  text-green-950">Payment Successfull!</div>

                <div className='text-white font-bold flex justify-center flex-col items-center pt-5 pb-8 p-5'>
                    <div className='flex items-center w-full justify-center'>

                        <span className="text-3xl font-bold text-green-950">₹{amount || 0}</span>
                    </div>
                    <p className='text-slate-500'>Sent successfully to</p>
                    <p className='text-zinc-800 text-2xl pl-3 pt-1 text-center w-max relative'>{toName}
                        <p className='text-sm absolute  text-slate-500  -bottom-4 font-extrabold text-center w-full'><a href={`mailto:${username}`}>{username}</a></p>
                        
                    </p>
                </div>
                    <p className='text-green-700 font-bold'>on {realDate} at {time}</p>
                <p className='text-slate-500'>Current Balance - <span className='font-semibold text-slate-600'>₹{Math.floor(balance)}</span></p>
                <button onClick={() => {
                    navigate('/dashboard')
                }} className='font-bold rounded-lg transition 0.08s shadow-md hover:bg-blue-950 mt-5 text-xl text-white bg-blue-500 w-full py-2 px-2'><i>Leave</i></button>
            </div>
        </div>
    </div>
}