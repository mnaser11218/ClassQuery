import { createContext, useState } from 'react';
import { Reset } from 'styled-reset'
import styled, {createGlobalStyle} from 'styled-components';
import Header from './Components/Header';
import QuestionsPage from './Components/QuestionsPage';
import Home from './Components/Home';
import AnswersPage from './Components/Answerspage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AskPage from './Components/AskPage';
import LoginPage from './Components/LoginPage';
import UserContext from './Components/UserContext';
import Profile from './Components/Profile';
import RegisterPage from './Components/RegisterPage';
import LoggedInUser from './LoggedInUser';
import LeftSideBar from './Components/LeftSideBar';
import RightSideBar from './Components/RightSideBar';
import { UserProvider } from './CurrentUser';
import AssignmentQuestions from './Components/AssignmentQuestions';
import { Footer } from './Components/Footer';
import AddAssignment from './Components/AddAssignment';
import ShowTags from './Components/ShowTags';
import TagQuestions from './Components/TagQuestions';
import AddTag from './Components/AddTag';
import GlobalStyles from './styled-components/GlobalStyles';
import WholePage from './styled-components/WholePageDivStyle';

// const WholePage = styled.div`
// display: grid;
// grid-template-columns: 250px 1fr 150px;
//   height: 100vh;
//    grid-template-rows: auto 1fr;
//     @media (max-width: 768px) {
//     height: 100%;
//     grid-template-columns: 1fr; /* Full-width layout for mobile */
//     grid-template-rows: auto 1fr; /* Keep header on top */
//     width: 100%;
//   }
// `

;


function App() {
const [user, setUser] = useState(null);
  return (
    <>
   <UserProvider>
   {/* <UserContext.Provider value={user}> */}
   <Router>
  
 

    <WholePage>
    <Header />
      <LeftSideBar data-testid={'cypress-left-nav'} />
    <div >
      <Reset/>
      <GlobalStyles />
     
     
      
     
     
      <Routes >
      <Route path="/questionspage" element={ <QuestionsPage/>} />
      <Route path="/assignmentquestion/:id" element={ <AssignmentQuestions/>} />
      <Route path="/addassignment" element={ <AddAssignment/>} />
      <Route path="/tags" element={<ShowTags/>}/>
      <Route path="/tagquestions/:id" element={<TagQuestions />}/> 
      <Route path="/addtag" element={<AddTag  />}/> 
      <Route path="/login" element={ <LoginPage/>} />
      <Route path="/register" element={ <RegisterPage/>} />

      <Route path="answerspage/:id" element={<AnswersPage />}/> 
      <Route path="users/:id" element={<Profile />}/> 
      <Route path="/" element={ <Home/>} />
      <Route path="/askpage" element={<AskPage/>} />
      <Route path="/askpage/:id" element={<AskPage/>} />
      <Route path="/profile" element={<LoggedInUser/>} />

      </Routes>
      
      {/* <button onClick={runfetch}></button> */}
     
      
    </div> 
   <RightSideBar/>
   {/* <Footer/> */}

    </WholePage>
    
    </Router>
    {/* </UserContext.Provider> */}
   
    </UserProvider>
    
    </>
  );
}

export default App;





// const runfetch = () => {
//   const API_URL = `http://localhost:8080`;
// fetch(`http://localhost:8080/api/questions?eagerload=true`
//   , {
//   method: 'GET',
//   headers: {
//     Authorization: 'Bearer ' + `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyNDU4NTgwNywiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzI0NDk5NDA3fQ.UcohAYsrVnIrN58gCYciwbBqbMwM5cmhJaA6U0ykHq-FYJGe_uFL9paFjg4gG8AA8eAmv8cmCIfKJblWlJTkkA`
//   }})
//   .then(res => {
//     console.log("inside fetch method")
//     //console.log("res is ", Object.prototype.toString.call(res));
//     return res.json();
//   })
//   .then(data => {
//     console.log("data fetched")
//     console.log(data)
//     //```data.map(ele=> console.log(ele))
//     //show(data);
//   })
//   .catch(error => {
//     console.log(`Error Fetching data : ${error}`);
//    // document.getElementById('posts').innerHTML = 'Error Loading Data';
//   });
// }
