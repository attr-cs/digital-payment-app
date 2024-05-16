import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Subheading } from "../components/Subheading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export function Signin()
{
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    return <div className="bg-slate-300 min-h-screen h-max py-10 px-2 flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white w-80 text-center rounded-lg p-2 h-max px-4">
                <Heading label={"Sign In"}/>
                <Subheading label={"Enter your credentials to access your account.."}/>
                <InputBox onChange={(e)=>{
                    setUsername(e.target.value)
                }} label={"Email"} placeholder={"john@sample.com"}/>
                <InputBox onChange={(e)=>{
                    setPassword(e.target.value)
                }} label={"Password"} placeholder={"**********"}/>
                <div className="pt-4">
                    <Button onClick={async ()=>{
                        const response = await axios.post('http://localhost:3000/api/v1/user/signin',{
                            username,
                            password
                        })
                        if(response.status==200)
                        {
                            localStorage.setItem("token",response.data.token);
                            navigate('/dashboard')
                        }
                        else{
                            console.log("User not found");
                        }
                    }} label={"Sign in"}/>
                </div>
                <BottomWarning buttonText={"Sign up"} label={"Don't have an account?"} to={'/signup'}/>
            </div>
        </div>
    </div>
}