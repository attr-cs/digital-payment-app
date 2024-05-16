import { useSearchParams } from 'react-router-dom'
import { Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RecoilRoot, useRecoilState } from 'recoil';
import axios from 'axios';
import { useState } from 'react';
import { balanceAtom } from '../store/atoms/atom';

export function Send() {
    const [searchParam] = useSearchParams();
    const id = searchParam.get("id");
    const username = searchParam.get("username");
    const toName = searchParam.get("name");
    
    return <RecoilRoot>
        <SendSubComponent toName={toName} username={username} id={id}/>
    </RecoilRoot>
}

function SendSubComponent({toName,username,id})
{
    const [amount,setAmount] = useState("");
    const navigate = useNavigate();
    const [balance,setBalance] = useRecoilState(balanceAtom);
    return <div className="min-h-screen h-max bg-slate-700 flex py-10 px-2 justify-center ">
    <div className="flex flex-col justify-center">
        <div className="bg-white w-80 text-center rounded-lg p-2 h-max px-4">
        <div className="font-bold text-4xl pt-6 text-green-950">Send</div>
            <div className='text-white font-bold  flex justify-center flex-col items-center pt-5 pb-8 mb-4'>
                <div className={"w-15 h-15 sm:w-20 text-4xl font-bold sm:h-20 bg-slate-600 rounded-full p-3 flex justify-center items-center  "}>{toName[0]}
                </div>
                <p className='text-zinc-800 text-2xl pl-3 pt-3 text-center relative w-max'>{toName}
                <p className='text-sm absolute  text-slate-500 underline -bottom-4 font-extrabold text-center w-full'><a href={`mailto:${username}`}>{username}</a></p>
                </p>
            </div>
            <div className='flex items-center w-full justify-center'>

                <span className="text-3xl font-bold text-green-950">₹</span>
                <Input autoFocus  onChange={(e)=>{setAmount(e.target.value)}} placeholder='Amount ' sx={{fontFamily:'monospace',fontSize:'25px',paddingLeft:'10px',width:'80%',textAlign:'center'}}/>
            </div>
            <button onClick={()=>{
                if(amount==0 || amount.length>=10 || amount==null || localStorage.getItem("token") == null || balance == 0 || amount>balance)
                    {
                        navigate(`/payment-failed?id=${id}&username=${username}&name=${toName}&amount=${Math.abs(amount)}`);   
                }
                else{
                    axios({
                        url:'http://localhost:3000/api/v1/user/transfer',
                        method:'post',
                        data:{
                            amount:amount,
                            to:id
                        },
                        headers:{
                            'authorization':`Bearer ${localStorage.getItem("token")}`
                        }
                    })
                    .then(response=>{
                        if(response.status!=200 || response.status==403)
                            {
                                navigate(`/payment-failed?username=${username}&name=${toName}&amount=${amount}`);
                            }else{
                                const getBalance = async()=>{
                                const res = await fetch('http://localhost:3000/api/v1/account/balance',{method:'GET',headers:{authorization:`Bearer ${localStorage.token}`}});
                                const data = await res.json();
                                const mydata = data.balance;
                                setBalance(mydata);
                            }
                            getBalance()
                            navigate(`/payment-done?username=${username}&name=${toName}&amount=${amount}`);
                        }
                    })
                }
                
                }} className='font-bold rounded-lg transition 0.08s shadow-md hover:bg-blue-950 mt-8 text-2xl text-white bg-blue-500 w-full py-2 px-2'><i>Pay</i></button>
                <button onClick={()=>{navigate('/')}} className='font-bold rounded-lg transition 0.08s shadow-md hover:bg-blue-950 mt-2 mb-5 text-2xl text-white bg-blue-500 w-full py-2 px-2'><i>Back</i></button>
        </div>
    </div>
</div>
}