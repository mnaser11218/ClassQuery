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
    const { setCurrentLoggedInUser } = useUser()
    const handleLogOut = (e)=> {
        e.preventDefault()
        setCurrentLoggedInUser(null);
        navigate('/home')
    }

    return (<H1HeaderTag> Welcome
    <hr></hr>
    <BlueButton onClick={handleLogOut}>Log Out</BlueButton>
    </H1HeaderTag>)
}
export default LoggedInUser;