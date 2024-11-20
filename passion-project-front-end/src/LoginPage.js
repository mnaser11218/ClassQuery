import styled from "styled-components";
import H1HeaderTag from "./styled-components/H1HeaderTag";
import StyledInput from "./styled-components/StyledInput";

function LoginPage(){
const CenterPageDiv = styled.div`
padding: 30px 28px;
`
return (
    <>
    <CenterPageDiv>
    <H1HeaderTag>Login </H1HeaderTag>
    <StyledInput/>
    </CenterPageDiv>

    
    </>
)
}
export default LoginPage;