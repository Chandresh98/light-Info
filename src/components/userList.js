import React,{userState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'

const UserDetails =()=>{
    const [users, setUsers] = userState([]);

    const user = localStorage.getItem('user')
    const navigate = useNavigate()

    useEffect(()=>{
        
        
       getUser();
       navigate('/getList')
       
    })

const getUser = async ()=>{
    let result = fetch('http://localhost:5000/getuser/'+JSON.parse(user)._id)
    result =await result.json()
    setUsers(result)
    console.log(JSON.parse(user)._id)
}
console.log('users', users)

    return(
      
        <div className='items' >
        <h1>Personal Details</h1>
       <h2>Name :-{users.name}</h2>
       <h2>Email :-{users.email}</h2>
       <button type='button'>Update Name or Email</button>
     </div>
    )
}

export default UserDetails