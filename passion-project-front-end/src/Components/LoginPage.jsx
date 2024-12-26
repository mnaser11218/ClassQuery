import styled from "styled-components";
import { Component } from "react";
import H1HeaderTag from "../styled-components/H1HeaderTag";
import StyledInput from "../styled-components/StyledInput";
import BlueButton from "../styled-components/BlueButton";
import axios from 'axios'
import ErrorBox from "../styled-components/ErrorBox";
import {useRef, useEffect, useState } from 'react';
import LoggedInUser from "../LoggedInUser";
import { useUser } from "../CurrentUser";
import { useNavigate } from "react-router-dom";
const CenterPageDiv = styled.div`
padding: 30px 28px;
`
 function LoginPage(){
    const [userName, setUserName]= useState('')
    const [password, setPassword]= useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const { setCurrentLoggedInUser } = useUser()
    const navigate = useNavigate()
    //const userRef = useRef()



    useEffect(()=>{
       // userRef.current.focus()
        console.log("logged int")
    }, [])
   useEffect(()=>{
    setError(false)
   }, [userName, password])

  const handleLogin = async(e)=>{
    e.preventDefault();


  try {
    const response = await fetch(`http://localhost:8080/api/user-profiles/username/${userName}`);
    if (!response.ok) {
      alert('User not found');
      setError(true);
      return;
    }

    const user = await response.json();

    if (user.password === password) {
      alert(`You are now logged in, ${user.name}!`);
      setCurrentLoggedInUser(user); 
    //   navigate('/lo');
    setSuccess(true);
    } else {
      alert('Wrong password');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred');
  }
  }
    
    return (
        <>
        
            {success ? (
                <LoggedInUser/>
            ) :
        
        <CenterPageDiv>
       { error && <ErrorBox>This is an incorrect login</ErrorBox>}
        <H1HeaderTag>Login </H1HeaderTag>
        <StyledInput
        autoComplete="off"
        required
         placeholder="email"
          type="email" 
          value={userName}
        onChange={e=>setUserName(e.target.value)}
        />
        <StyledInput 
        autoComplete="off"
        required
        placeholder="password" 
        type="password" 
        value={password} 
        onChange={e=>setPassword(e.target.value)}
        />
        <BlueButton onClick={handleLogin}>Login</BlueButton>
        </CenterPageDiv>
    
 }
        </>
    )


}
export default LoginPage;