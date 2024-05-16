import { useRecoilState, useRecoilValue } from 'recoil';
import { balanceAtom } from '../store/atoms/atom';
import { Suspense, useEffect, useState } from 'react';

export function Balance()
{
    const [balance,setBalance] = useRecoilState(balanceAtom);
    useEffect(()=>{
        const getBalance = async ()=>{
                const res = await fetch('http://localhost:3000/api/v1/account/balance',{method:'GET',headers:{authorization:`Bearer ${localStorage.token}`}});
                const data = await res.json();
                setBalance(data.balance);
        }
        getBalance();
    },[setBalance,balance])
    return <div className='text-slate-200 pl-10 text-lg w-full relative py-7 bg-slate-800'>
    Your Balance:  <span className='text-green-400 font-bold'>₹</span> <span className='font-semibold text-white'>{<Suspense fallback={"loading.."} >{Math.floor(balance) || "0"}</Suspense>} <p className='text-slate-400 absolute text-sm'>(If not updated, try to refresh.)</p></span>
    <button onClick={()=>{
        const getBalance = async ()=>{
            const res = await fetch('http://localhost:3000/api/v1/account/balance',{method:'GET',headers:{authorization:`Bearer ${localStorage.token}`}});
            const data = await res.json();
            setBalance(data.balance);
    }
    getBalance();
    }} className='absolute right-5 rounded-lg hover:bg-blue-500 active:bg-blue-600 transition 0.4s bg-blue-400 text-white font-semibold py-1 px-4'>Refresh</button>
 </div>
}