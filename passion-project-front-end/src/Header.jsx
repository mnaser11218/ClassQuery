import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStackOverflow} from '@fortawesome/fontawesome-free-brands'
import {Link} from "react-router-dom"
import { useContext } from "react";
import UserContext from "./UserContext";
import { useUser } from "./CurrentUser";
const StyledHeader = styled.header`
//border-top: solid 2px #FF9900;
border-top: solid 2px hsl(27, 89%, 48%);
grid-column-gap: 20px;
//background-color: #F8F7E5;
//background-color: #874F41;
background-color: #3f3f3f;
box-shadow: 0px 1px 1px hsl(27, 89%, 48%);
display: grid;
grid-template-columns: 250px 1fr 200px;
border-bottom: 1px solid #777;
`;

const ProfileLink = styled(Link)`
//color: #fff;
//color: #874F41;
color:white;
text-decoration: none;
margin-top: 10px;
line-height: 50px;
`

const LogoLink = styled.a`
text-decoration: none;
color: white;
//color: #E64833;
//color: #0b1f1c;
//color:#874F41;
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
   // const user= useContext(UserContext);
   const { currentLoggedInUser } = useUser();

    return (
        <StyledHeader>
            {console.log("the user is:: " + currentLoggedInUser)}
        <LogoLink href="/questionspage" className="logo">
        <FontAwesomeIcon style={{"color": "#FF9900"}}icon={faStackOverflow} size="2x"/>
        <span>
    class<b>Query</b>
    </span>
    </LogoLink>
    
    <form action="" className="search">
  
    <StyledInput type="text" placeholder="Search... " />
    </form>
    {currentLoggedInUser ? <ProfileLink to="/profile" className="profile" onClick={()=> console.log("called username")}>{currentLoggedInUser.name}</ProfileLink>  : <div><ProfileLink to="/login" className="profile" onClick={()=> console.log("called login")}>Login</ProfileLink>   <ProfileLink to="/register">Register</ProfileLink></div>}

   </StyledHeader>
    )
}
export default Header;
