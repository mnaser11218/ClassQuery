import styled from "styled-components"
import H1HeaderTag from "./styled-components/H1HeaderTag"
import { useContext } from "react";
// import UserContext from "./UserContext";
import { useUser } from "./CurrentUser";
import BlueButton from "./styled-components/BlueButton";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from './assets/login_animation.json'
import logoutAnimation from './assets/logout_animation.json'
import login2 from './assets/login2_animation.json'
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
  { !currentLoggedInUser ? <div>  <Lottie style={{"width": "10%", "height": "10%"}} animationData={login2} /> <BlueButton onClick={handleLoggedIn}> Log In</BlueButton> </div> : <div> <Lottie style={{"width": "10%", "height": "10%"}} animationData={logoutAnimation} /> <BlueButton data-test="logout-button" onClick={handleLogOut}>Log Out</BlueButton> </div> }
    </H1HeaderTag>) 
}
export default LoggedInUser;