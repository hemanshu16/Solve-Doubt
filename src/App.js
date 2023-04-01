import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Signin from './Components/Signin';
import Singup from './Components/Singup';
import React from 'react';
import UpdateQuestion from './Components/User/UpdateQuestion';
import ViewQuestions from './Components/User/ViewQuestions';
import Home from './Components/Home';
import ViewDetailedQuestion from './Components/ViewDetailedQuestion';
import Profile from './Components/User/Profile';
function App() {
  const [login, setLogin] = React.useState(false)
  return (
    <>
   
    <BrowserRouter>
    <Navbar login_status={login} setLogin={setLogin}/>
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='Singin' element={<Signin setLogin={setLogin}/>} />
      <Route exact path='SingUp' element={<Singup />} />

      <Route exact path='User'>
         <Route exact path="UpdateQuestion/:questionId" element={<UpdateQuestion />} />
         <Route exact path="UpdateQuestion/" element={<UpdateQuestion />} />     
         <Route exact path="ViewQuestions/" element={<ViewQuestions />} />        
         <Route exact path="Profile/" element={<Profile />} />
       </Route>  
       <Route exact path='DetailedQuestion/:questionId' element={ <ViewDetailedQuestion />} />
    </Routes>
  </BrowserRouter>

  <footer className="">
     <hr className='border border-dark'/>
      <div className="container pb-4">
     
          
          <div className="text-muted d-flex justify-content-between align-items-center pt-3">
              <p className="mb-0">Copyright © 2023 <img height="50px" src="/logo.png" alt="logo"/></p>
              <ul className="list-inline mb-0">
                 <a href="https://www.linkedin.com/in/hemanshu-faldu-54a732207/" >
                  <li className="list-inline-item"><img width="25px" style={{"cursor" : "pointer"}} height="25px" src="https://cdn-icons-png.flaticon.com/512/665/665212.png" alt="linkdin"/></li>
                 </a>
              </ul>
          </div>
      </div>
  </footer>
  </>
  );
}

export default App;
