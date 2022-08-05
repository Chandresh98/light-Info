import React,{useState, useEffect} from 'react';
import '../App.css';
import {useNavigate} from 'react-router-dom'


let Login = function () {
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");


    const navigate = useNavigate()

    useEffect(()=>{
        const auth = localStorage.getItem('token')
        if(auth){
          navigate('/')
        }
     })

    const handleLogin = async ()=>{
        let result = await fetch('http://localhost:5000/login',{
            method:"Post",
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json()
        console.log(result)
        if(result.data){
            localStorage.setItem("token" , JSON.stringify(result.token))
            localStorage.setItem("user" ,JSON.stringify(result.data))
            navigate('/getList')
            
        }else{
            alert('please enter correct details')
        }
    }
    return (
        <div className="box">
            <h1>Login</h1>
            <input type="text" name="" placeholder="Email" 
            value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" name="" placeholder="Password"
            value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type='button' onClick={handleLogin}>Login</button>
            
           
        </div>

    )
}




export default Login


