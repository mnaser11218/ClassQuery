import styled from "styled-components";
import { Component } from "react";
import H1HeaderTag from "./styled-components/H1HeaderTag";
import StyledInput from "./styled-components/StyledInput";
import BlueButton from "./styled-components/BlueButton";
import axios from 'axios'
import ErrorBox from "./styled-components/ErrorBox";
import {useRef, useEffect, useState } from 'react';
const CenterPageDiv = styled.div`
padding: 30px 28px;
`
 function LoginPage(){
    const [userName, setUserName]= useState('')
    const [password, setPassword]= useState('')
    const [error, setError] = useState(false)
    useEffect(()=>{
        console.log("logged int")
    }, [])
    // constructor(props){
    //     super(props);
    //     this.state= {
    //         userName: '',
    //         password: '',
    //         error:false,
    //     }
    // }
   

    const handleLogin = ()=> {
            // axios.post('http://localhost:8080/api/user-profiles', {
            //     data: {
            //         emailAddress: this.userName,
            //         password: this.password,
            //     }
            // })
            // this.setState({error: true})
            setError(true)
            console.log("username is: " + userName + " password is: " + password )

    }

    
    return (
        <>
        
        <CenterPageDiv>
       { error && <ErrorBox>This is an incorrect login</ErrorBox>}
        <H1HeaderTag>Login </H1HeaderTag>
        <StyledInput placeholder="email" type="email" value={userName}
        onChange={e=>setUserName(e.target.value)}
        />
        <StyledInput placeholder="password" type="password" value={password} 
        onChange={e=>setPassword(e.target.value)}
        />
        <BlueButton onClick={handleLogin}>Login</BlueButton>
        </CenterPageDiv>
    
        
        </>
    )


}
export default LoginPage;