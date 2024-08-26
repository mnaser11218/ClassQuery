import { Reset } from 'styled-reset'
import styled, {createGlobalStyle} from 'styled-components';
import Header from './Header';
import QuestionPage from './QuestionsPage';
import Home from './Home';
import AnswersPage from './Answerspage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AskPage from './AskPage';



const GlobalStyles = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300,400;700&display=swap');
  body{
    // background: #2d2d2d;
    color:#fff;
    font-family: Roboto, arial, sans-serif;
  }
`;

function App() {

  return (
    <>
    <Router>
    <div>
      <Reset/>
      <GlobalStyles />
      <Header />

      <Routes >
      <Route path="/questionspage" element={ <QuestionPage/>} />
      <Route path="answerspage" element={<AnswersPage />}/> 
      <Route path="/" element={ <Home/>} />
      <Route path="/askpage" element={<AskPage/>} />

      </Routes>

      {/* <button onClick={runfetch}></button> */}

    </div>
    </Router>
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
