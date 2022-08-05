import React,{useEffect, useState} from "react";
import '../App.css';
import {useParams,useNavigate} from 'react-router-dom'


const Upadate = function () {

    // const auth = localStorage.getItem('user')
    const [name,setName]= useState("");
    const [password,setPassword]= useState("");
      const params = useParams()

      const navigate = useNavigate()
      useEffect(()=>{
        console.log(params)
        getUserDetails()
      })

      const getUserDetails = async ()=>{
        let result = await fetch(`http://localhost:5000/getuser/${params.id}`)
        result = await result.json()
        console.log(result)
        setName(result.name)
        setPassword(result.password)
      }

    const updateUser = async ()=>{
    console.log(name,password)
    let result = await fetch(`http://localhost:5000/update/${params.id}`,{
        method:"put",
        body:JSON.stringify({name,password}),
        headers:{
            'Content-Type':'application/json'
        }
    })
result = await result.json()
console.log(result)
navigate('/getList')


    }

    
    return (
        <div className='update'>
            <h1>Update</h1>
            <input type="text" name="" placeholder="Name"
            value={name} onChange={(e) => {setName(e.target.value)} }/>
            <input type="password" name="" placeholder="Password"
            value={password} onChange={(e) =>{ setPassword(e.target.value)}}/>

            <button onClick={updateUser}>Update</button>
        </div>
    )
}




export default Upadate