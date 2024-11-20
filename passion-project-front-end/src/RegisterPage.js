import styled from "styled-components";
import { Component } from "react";
import H1HeaderTag from "./styled-components/H1HeaderTag";
import StyledInput from "./styled-components/StyledInput";
import BlueButton from "./styled-components/BlueButton";
import axios from 'axios'
const CenterPageDiv = styled.div`
padding: 30px 28px;
`
 class RegisterPage extends Component{
    constructor(props){
        super(props);
        this.state= {
            userName: '',
            password: '',
        }
    }
     handleLogin = ()=> {
            // axios.post('http://localhost:8080/api/user-profiles', {
            //     data: {
            //         emailAddress: this.userName,
            //         password: this.password,
            //     }
            // })
            console.log("clicked register button")
    }

render(){
    return (
        <>
        <CenterPageDiv>
        <H1HeaderTag>Register </H1HeaderTag>
        <StyledInput placeholder="email" type="email" value={this.state.userName}
        onChange={e=>this.setState({userName: e.target.value})}
        />
        <StyledInput placeholder="password" type="password" value={this.state.password} 
        autocomplete={'new-password'}
        onChange={e=>this.setState({password: e.target.value})
    
    }
        />
        <BlueButton onClick={this.handleLogin}>Register</BlueButton>
        </CenterPageDiv>
    
        
        </>
    )
}


}
export default RegisterPage;