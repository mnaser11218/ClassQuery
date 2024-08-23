import logo from './logo.svg';
import './App.css';

function App() {
  const runfetch = () => {
    const API_URL = `http://localhost:8080`;
  fetch('http://localhost:8080/api/questions?eagerload=true', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyNDU0MDQzMiwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzI0NDU0MDMyfQ.HVL-VznJQZ0mc2O2pX8N-uwfjNIX_IG8aXeCi6_DAkMycwda-62gtLxTq7Vy3xh55myd-K7Y5LkHIwQZ-H8CEw`
    }})
    .then(res => {
      //console.log("res is ", Object.prototype.toString.call(res));
      return res.json();
    })
    .then(data => {
      console.log("data fetched")
      console.log(data)
      //```data.map(ele=> console.log(ele))
      //show(data);
    })
    .catch(error => {
      console.log(`Error Fetching data : ${error}`);
     // document.getElementById('posts').innerHTML = 'Error Loading Data';
    });
  }

  return (
   
    <div className="App">
       {runfetch()}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
