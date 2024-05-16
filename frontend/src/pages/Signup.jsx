import axios from 'axios';
import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Subheading } from "../components/Subheading";
import { useNavigate } from 'react-router';

export function Signup()
{
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    return <div className="bg-slate-300 min-h-screen h-max py-10 px-2 flex justify-center">
        <div className="flex flex-col justify-center ">
            <div className="bg-white w-80 text-center shadow-md rounded-lg p-2 h-max px-4">
                <Heading label={"Sign up"}/>
                <Subheading label={"Enter your information to create your account.."}/>
                <InputBox onChange={(e)=>{
                    setFirstname(e.target.value)
                }} label={"First Name"} placeholder={"John"}/>
                <InputBox onChange={(e)=>{
                    setLastname(e.target.value)
                }} label={"Last Name"} placeholder={"Deo"}/>
                <InputBox onChange={(e)=>{
                    setUsername(e.target.value)
                }} label={"Email"} placeholder={"john@sample.com"}/>
                <InputBox onChange={(e)=>{
                    setPassword(e.target.value)
                }} label={"Password"} placeholder={"**********"}/>
                <div className="pt-4">
                    <Button onClick={async ()=>{
                        const response = await axios.post('http://localhost:3000/api/v1/user/signup',{
                            username,
                            password,
                            firstname,
                            lastname
                        })
                        if(response.status!=200)
                            {
                                localStorage.setItem("token",response.data.token);
                                navigate('/dashboard');
                            }
                            else{
                                navigate('/signup');
                            }
                        
                    }} label={"Sign up"} ></Button>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={'/signin'}></BottomWarning>
            </div>
        </div>
    </div>
}