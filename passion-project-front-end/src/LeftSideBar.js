import styled from "styled-components";
// import { IconName } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { MdOutlineAssignment } from "react-icons/md";
import { Link } from "react-router-dom";


const SidebarBody = styled.div`
//border-right: 1px solid #777;
border-right: 1px solid hsl(210,8%,5%);
`

const Text = styled(Link)`
text-decoration: none;
color: color: var(--theme-link-color, var(--theme-secondary-400));

`


function LeftSideBar(){
    return (<SidebarBody >
        <div style={{"padding": "20px 5px" }}>
            <nav>
                <ol>
                <Text to="/profile">
                    <li><FaHome/> <span>Home</span> </li>
                    </Text> 

                    <Text to="/questionspage">
                    <li> <GoSearch /> <span>Question</span></li>
                    </Text>

                    <Text to="/">
                    <li><MdOutlineAssignment /> <span>Assignments</span></li>
                    </Text>

                </ol>
            </nav>
        </div>

    </SidebarBody>)
}
export default LeftSideBar;