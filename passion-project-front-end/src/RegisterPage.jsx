import styled from "styled-components";
import { Component, useState } from "react";
import H1HeaderTag from "./styled-components/H1HeaderTag";
import StyledInput from "./styled-components/StyledInput";
import BlueButton from "./styled-components/BlueButton";
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
        <CenterPageDiv>
        <H1HeaderTag>Register </H1HeaderTag>
        <StyledInput placeholder="name" type="name" value={name}
        onChange={e=>setName(e.target.value)}
        />
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