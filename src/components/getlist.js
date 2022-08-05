import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom'

let Getlist = function () {
    const auth = localStorage.getItem('user')
  



    return (
        <div className='items' >
            <h1>Personal Details</h1>
            <h2>Name :-{JSON.parse(auth).name}</h2>
            <h2>Email :-{JSON.parse(auth).email}</h2>
                <Link to={"/update/"+JSON.parse(auth)._id}>Update</Link>

        </div>
    )
}


export default Getlist