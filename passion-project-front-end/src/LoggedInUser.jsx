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
    

    return (<H1HeaderTag> Welcome
    <hr></hr>
  { !currentLoggedInUser ?  <BlueButton onClick={handleLoggedIn}> Log In</BlueButton>  :  <BlueButton onClick={handleLogOut}>Log Out</BlueButton> }
    </H1HeaderTag>) 
}
export default LoggedInUser;