import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStackOverflow} from '@fortawesome/fontawesome-free-brands'
import {Link} from "react-router-dom"
const StyledHeader = styled.header`
border-top: solid 2px #FF9900;
grid-column-gap: 20px;
background-color:#393939;
box-shadow: 0px 3px 3px rgba(0,0,0, .2);
display: grid;
grid-template-columns: 250px 1fr 200px
`;

const ProfileLink = styled(Link)`
color: #fff;
text-decoration: none;
margin-top: 10px;
line-height: 50px;
`

const LogoLink = styled.a`
text-decoration: none;
color: white;
display: inline-block;
height: 50px;
line-height: 50px;
padding: 10px 15px;
font-size: 1.2rem;
b{
font-weight: bold;
display: inline-block;
margin-left: 2px;
}
span{
margin-left: 5px;
padding: 10px;
padding-top: 10px;
font-weight: 300;
}
`
const StyledInput = styled.input`
display: inline-block;
box-sizing: border-box;
background-color: white;
width: 100%;
padding: 10px 10px;
margin-top: 10px;
border-radius: 5px;
border: 1px solid #777;

`
function Header (){
    return (
        <StyledHeader>
        <LogoLink href="/questionspage" className="logo">
        <FontAwesomeIcon icon={faStackOverflow} size="2x"/>
        <span>
    class<b>Query</b>
    </span>
    </LogoLink>
    
    <form action="" className="search">
  
    <StyledInput type="text" placeholder="Search... " />
    </form>
 <ProfileLink href="" className="profile" onClick={()=> console.log("called username")}>Username</ProfileLink>
 <ProfileLink to="/login" className="profile" onClick={()=> console.log("called login")}>Login</ProfileLink>

   </StyledHeader>
    )
}
export default Header;
