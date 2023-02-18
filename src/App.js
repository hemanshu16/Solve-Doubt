import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import SubmitIssue from './Components/Users/SubmitIssue';
import GeneralQuestions from './Components/Users/GeneralQuestions';
function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route exact path='/' element={<><div>home page</div> </>} />
      <Route exact path='User'>
        <Route exact index element = {<Profile />} />
        <Route exact path='GeneralQuestions' element = {<GeneralQuestions />} />
        <Route exact path='SubmitIssue' element = {<SubmitIssue />} />
        <Route exact path='ViewIssues' element = {<h1>View Issue</h1>} />
       </Route>  
       <Route exact path='VC'>
        <Route exact index element = {<Profile />} />
        <Route exact path='VerifyUser' element = {<h1>verify user vc  Issue</h1>} />
        <Route exact path='ViewIssues' element = {<h1> v View Issue</h1>} />
       </Route>  
       <Route exact path='Mamlatdar'>
        <Route exact index element = {<Profile />} />
        <Route exact path='ViewIssues' element = {<h1> m View Issue</h1>} />
       </Route> 
       <Route exact path='Collector'>
        <Route exact index element = {<Profile />} />
        <Route exact path='ViewIssues' element = {<h1> c View Issue</h1>} />
       </Route>  
    </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
