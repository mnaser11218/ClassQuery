import styled from "styled-components";
import { Component, useState } from "react";
import H1HeaderTag from "../styled-components/H1HeaderTag";
import StyledInput from "../styled-components/StyledInput";
import BlueButton from "../styled-components/BlueButton";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const CenterPageDiv = styled.div`
padding: 30px 28px;
`
 function RegisterPage (){
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] =useState('')
    const navigate = useNavigate()

     const handleRegister = (e)=> {
         e.preventDefault()
            console.log("clicked register button")
            fetch('http://localhost:8080/api/user-profiles', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    name: name,
                    emailAddress: userName,
                    password: password,
                    created: new Date(),
                    "questions": null
                  })
              }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    navigate('/login')
     });
            
    }

    return (
        <>
        <CenterPageDiv data-test="register-page">
        <H1HeaderTag data-test="register-page-header">Register </H1HeaderTag>
        <StyledInput data-test="register-page-input-name" div-cypress="name-input" placeholder="name" type="name" value={name}
        onChange={e=>setName(e.target.value)}
        />
        <StyledInput data-test="register-page-input-email"  div-cypress="email-input" placeholder="email" type="email" value={userName}
        onChange={e=>setUserName(e.target.value)}
        />
        <StyledInput data-test="register-page-password-email"  div-cypress="password-input" placeholder="password" type="password" value={password} 
        autocomplete={'new-password'}
        onChange={e=>setPassword(e.target.value)}
        />
        <BlueButton data-test="register-page-submit-button"  div-cypress="button-submit-register" onClick={handleRegister}>Register</BlueButton>
        </CenterPageDiv>
    
        
        </>
    )


}
export default RegisterPage;