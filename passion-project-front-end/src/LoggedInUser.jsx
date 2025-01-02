import styled from "styled-components"
import H1HeaderTag from "./styled-components/H1HeaderTag"
import { useContext } from "react";
// import UserContext from "./UserContext";
import { useUser } from "./CurrentUser";
import BlueButton from "./styled-components/BlueButton";
import { useNavigate } from "react-router-dom";


function LoggedInUser(){
  
    // const user = useContext(UserContext)
    const navigate = useNavigate()
    const { setCurrentLoggedInUser, currentLoggedInUser } = useUser()
    const handleLogOut = (e)=> {
        e.preventDefault()
        setCurrentLoggedInUser(null);
        navigate('/questionspage')
    }
    const handleLoggedIn =(e)=>{
        e.preventDefault()
        console.log(currentLoggedInUser)
        navigate("/login")
    }
    

    return (<H1HeaderTag data-test="h1-header-name"> { !currentLoggedInUser ?  " Welcome" : " Welcome, " + currentLoggedInUser.name }
    <hr></hr>
  { !currentLoggedInUser ?  <BlueButton onClick={handleLoggedIn}> Log In</BlueButton>  :  <BlueButton data-test="logout-button" onClick={handleLogOut}>Log Out</BlueButton> }
    </H1HeaderTag>) 
}
export default LoggedInUser;