import './App.css';
import React from 'react';
import Header from './components/header';
import Login from './components/login';
import Registration from './components/signup';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import UserDetails from './components/userList';
import Getlist from './components/getlist';
import Upadate from './components/update';
// import PrivateComponent from './components/privateCompentent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<h1>home page</h1>}/>
      <Route path='/service' element={<h1>service</h1>}/>
      <Route path='/about' element={<h1>about</h1>}/>
      <Route path='/contactUs' element={<h1>contactUs</h1>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/registration' element={<Registration/>}/>
      <Route path='/logout' element={<h1>logout</h1>}/>
      <Route path='/getUser' element={<UserDetails/>}/>
      <Route path='/getList' element={<Getlist/>}/>
      <Route path='/update/:id' element={<Upadate/>}/>
      

    </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
