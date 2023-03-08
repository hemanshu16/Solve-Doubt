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

       </Route>  
       <Route exact path='DetailedQuetion/:questionId' element={ <ViewDetailedQuestion />} />
    </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
