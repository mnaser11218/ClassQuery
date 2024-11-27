import styled from "styled-components";
import { Component, useState } from "react";
import H1HeaderTag from "./styled-components/H1HeaderTag";
import StyledInput from "./styled-components/StyledInput";
import BlueButton from "./styled-components/BlueButton";
import axios from 'axios'
const CenterPageDiv = styled.div`
padding: 30px 28px;
`
 function RegisterPage (){
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

     const handleRegister = (e)=> {
         e.preventDefault()
            console.log("clicked register button")
    }

    return (
        <>
        <CenterPageDiv>
        <H1HeaderTag>Register </H1HeaderTag>
        <StyledInput placeholder="email" type="email" value={userName}
        onChange={e=>setUserName(e.target.value)}
        />
        <StyledInput placeholder="password" type="password" value={password} 
        autocomplete={'new-password'}
        onChange={e=>setPassword(e.target.value)}
        />
        <BlueButton onClick={handleRegister}>Register</BlueButton>
        </CenterPageDiv>
    
        
        </>
    )


}
export default RegisterPage;