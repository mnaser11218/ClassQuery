import styled from "styled-components"

const StyledHeader = styled.h1`
color: white;
font-size: 1.8rem;
`
const HeaderRow = styled.div`
padding: 30px 20px;
display: grid;
grid-template-columns: 1fr min-content
`
const BlueButton = styled.button`
background-color: rgb(27, 117, 208);
color: white;
padding: 15px;
border-radius: 5px;
border: 0;
cursor: pointer;
`
function QuestionPage(){
    
    return(
        <main>
            <HeaderRow>
<StyledHeader>Questions</StyledHeader>
<BlueButton>Ask&nbsp;Question</BlueButton>
</HeaderRow>
        </main>
    )

}

export default QuestionPage;