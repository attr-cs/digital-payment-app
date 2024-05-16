import { SmallAvatar } from "./SmallAvatar";
import { Input } from "@mui/material";
import {useState,useEffect, Suspense, useCallback} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router";
export function Users()
{
    const [users,setUsers] = useState([]);
    const [filter,setFilter] = useState("");
    const navigate = useNavigate();

    // Debouncing
    useEffect(()=>{
            fetchUsers();
    },[filter])

    const fetchUsers = useCallback(
        async()=>{
            const res = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`);
            setUsers(res.data.user);
        }
        )

    return <div className="w-full flex justify-center p-4 sm:p-10">
        <div className="w-[98%] sm:w-[90%] shadow-2xl  bg-slate-900 rounded-md border-1 border-slate-400 px-5 sm:px-7">
        <h2 className="font-bold text-lg text-white pt-6">Users</h2>
        <Input onChange={(e)=>{setFilter(e.target.value)}} color="info" sx={{color:"white"}} type="text" placeholder={"Search users.."} className="w-full p-1 mt-2 bg-slate-700 text-white outline-none rounded px-4"/>
        
        <div className="py-2">
        {users.map(user=>{
            return <div key={user._id} className="hover:bg-slate-700 transition ease-in 0.2s w-full rounded text-white flex justify-between items-center p-2">
                <div className="flex items-center overflow-x-hidden">
                    <SmallAvatar text={user.firstname[0]}/>
                    <p className="text-left capitalize text-nowrap overflow-ellipsis overflow-x-hidden font-bold text-10 sm:text-20 pl-3">{user.firstname} {user.lastname}</p>
                </div>
                <button onClick={()=>{
                    const name = user.firstname + " " + user.lastname;
                    navigate(`/send?id=${user._id}&username=${user.username}&name=${name}`)
                }} className="bg-emerald-800 ml-4 text-nowrap hover:bg-emerald-950 rounded-md text-5 sm:text-md font-semibold py-1 px-2 sm:py-2 sm:px-4">Send Money</button>
            </div>
        })}
        </div>

        </div>
    </div>
}