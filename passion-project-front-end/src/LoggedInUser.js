import styled from "styled-components"
import H1HeaderTag from "./styled-components/H1HeaderTag"
import { useContext } from "react";
import UserContext from "./UserContext";


function LoggedInUser(){
    const user = useContext(UserContext)
    return (<H1HeaderTag >Logged in user page. User id is:  {user}</H1HeaderTag>)
}
export default LoggedInUser;