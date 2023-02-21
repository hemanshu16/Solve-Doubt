import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import SubmitIssue from './Components/Users/SubmitIssue';
import GeneralQuestions from './Components/Users/GeneralQuestions';
import ViewIssuesOwn from './Components/Users/ViewIssues';
import ViewIssues from './Components/VieworResolveIssues';
import VerifyProfile from './Components/VC/VerifyProfile';
import VerifyRequests from './Components/VC/VerifyRequests';
function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route exact path='/' element={<h1>home</h1>} />
      <Route exact path='User'>
        <Route exact index element = {<Profile />} />
        <Route exact path='GeneralQuestions' element = {<GeneralQuestions />} />
        <Route exact path='SubmitIssue' element = {<SubmitIssue />} />
        <Route exact path='ViewIssues' element = {<ViewIssuesOwn/>} />
       </Route>  
       <Route exact path='VC'>
        <Route exact index element = {<Profile />} />
        <Route exact path='VerifyProfile/:ProfileId' element = {<VerifyProfile /> } />
        <Route exact path='VerifyUser' element = {< VerifyRequests/>} />
        <Route exact path='ViewIssues' element = {<ViewIssues /> } />
       </Route>  
       <Route exact path='Mamlatdar'>
        <Route exact index element = {<Profile />} />
        <Route exact path='ViewIssues' element = {<ViewIssues />} />
       </Route> 
       <Route exact path='Collector'>
        <Route exact index element = {<Profile />} />
        <Route exact path='ViewIssues' element = {<ViewIssues />} />
       </Route>  
    </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
