

function App() {
  const runfetch = () => {
    const API_URL = `http://localhost:8080`;
  fetch(`http://localhost:8080/api/questions?eagerload=true`
    , {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcyNDU4NTgwNywiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzI0NDk5NDA3fQ.UcohAYsrVnIrN58gCYciwbBqbMwM5cmhJaA6U0ykHq-FYJGe_uFL9paFjg4gG8AA8eAmv8cmCIfKJblWlJTkkA`
    }})
    .then(res => {
      console.log("inside fetch method")
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
    <>
    
    <div>
      {/* <button onClick={runfetch}></button> */}
 <header>
  <a href="" className="logo">StudentExchangeFlowLogo</a>
  <form action="" className="search">

  <input type="text" placeholder="Search... " />
  </form>
  <a href="" className="profile">Mohammed</a>
  
 </header>
    </div>
    </>
  );
}

export default App;
