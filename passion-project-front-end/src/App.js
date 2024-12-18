import { createContext, useState } from 'react';
import { Reset } from 'styled-reset'
import styled, {createGlobalStyle} from 'styled-components';
import Header from './Header';
import QuestionsPage from './QuestionsPage';
import Home from './Home';
import AnswersPage from './Answerspage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AskPage from './AskPage';
import LoginPage from './LoginPage';
import UserContext from './UserContext';
import Profile from './Profile';
import RegisterPage from './RegisterPage';
import LoggedInUser from './LoggedInUser';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import { UserProvider } from './CurrentUser';
import AssignmentQuestions from './AssignmentQuestions';



const GlobalStyles = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300,400;700&display=swap');
  body{
     background: #2d2d2d;
    //background: #244855;
    //background: rgb(117, 132, 106);
    // background: rgb(168 213 227);
    //background: hsl(0,0%,100%);
    color: #F8F7E5;
   // color: hsl(210,8%,25%);
    //color:#fff;
    //color: #FBE9B0;
   //background: rgb(29, 29, 29);
    //color: black;
    font-family: Roboto, arial, sans-serif;
    font-size: 17px;
    letter-spacing: 0.5px;
    line-height: 1.5;
  }
   
    hr{
    margin-top: 10px;
   border-top: 1px solid #F8F7E5;
    }
    b,strong{
    font-weight: bold;
    }
    a{
    color: #fff;
    }
    p{
    margin: 10px 0;
    line-height: 1.3=5rem;
    }
    h1,h2{
    margin-top: 15px;
    margin-bottom: 20px;
    }
    h1{
    font-size: 1.8rem;
    }
    h2{
    font-size: 1.6rem;
    }
    span{
    margin-left: 10px;
    }
    li{
    position: relative;
    margin: 5px;
    border: 1px #F8F7E5;
    border-radius: 5px;
    padding: 7px;
    &:hover{
    background-color: #748D92;
    cursor: pointer;
    }
    
    }
    blockquote{
    background-color: rgba(0,0,0, .1);
    padding: 15px;
    border-radius: 4px; 
    }
input.react-tags__combobox-input{
border: 1px solid #777;
border-radius: 3px;
padding:10px;
display: inline-block;
width: 100%;
    margin: 15px;

box-sizing: border-box: 
margin-bottom: 20px;
color: #fff;
background: none;}

.tag{
    display: inline-block;
    margin-right: 3px;
    border: solid #777;
    padding: 7px;
    margin: 7px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    &:hover{
    color: #FF9900;
    //color: #748D92;
    border: none;
    }
}
`
const WholePage = styled.div`
display: grid;
grid-template-columns: 250px 1fr 250px;
  height: 100vh;
`

;


function App() {
const [user, setUser] = useState(null);
  return (
    <>
   <UserProvider>
   {/* <UserContext.Provider value={user}> */}
   <Router>
   <Header />
  

    <WholePage>
      <LeftSideBar />
    <div>
      <Reset/>
      <GlobalStyles />
     
     
      
     
     
      <Routes >
      <Route path="/questionspage" element={ <QuestionsPage/>} />
      <Route path="/assignmentquestion/:id" element={ <AssignmentQuestions/>} />
      <Route path="/login" element={ <LoginPage/>} />
      <Route path="/register" element={ <RegisterPage/>} />

      <Route path="answerspage/:id" element={<AnswersPage />}/> 
      <Route path="users/:id" element={<Profile />}/> 
      <Route path="/" element={ <Home/>} />
      <Route path="/askpage" element={<AskPage/>} />
      <Route path="/profile" element={<LoggedInUser/>} />

      </Routes>
      
      {/* <button onClick={runfetch}></button> */}
     
      
    </div> 
   <RightSideBar/>
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
