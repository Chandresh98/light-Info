import React,{useState,useEffect} from 'react';
import './registration.css';
import {useNavigate} from 'react-router-dom'


let Registration = function () {
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const navigate = useNavigate()


    useEffect(()=>{
       const auth = localStorage.getItem('token')
       if(auth){
         navigate('/')
       }
    })

    const collectData = async ()=>{
        console.log(name,email,password)
        let result = await fetch('http://localhost:5000/registration',{
            method:"Post",
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json()
        console.log(result.data)
        if(result){
            navigate('/login')  
        }else{
            navigate('/registration')
        }
    }
    return (
        <div className="box">
            <h1>Register</h1>
            <input type="text" name="" placeholder="Name" 
            value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="email" name="" placeholder="Email" 
            value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" name="" placeholder="Password" 
            value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={collectData} type="button">Register</button>
        </div>

    )
}

export default Registration