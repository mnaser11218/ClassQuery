import styled from "styled-components";
// import { IconName } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { MdOutlineAssignment } from "react-icons/md";
import { Link } from "react-router-dom";
import { LiaTagsSolid } from "react-icons/lia";



const SidebarBody = styled.div`
//border-right: 1px solid #777;
border-right: 1px solid #F8F7E5;
height: 100%;

`

const Text = styled(Link)`
text-decoration: none;
color: color: var(--theme-link-color, var(--theme-secondary-400));

`


function LeftSideBar(){
    return (<SidebarBody className="left-side-bar" >
        <div style={{"padding": "20px 5px" }}>
            <nav>
                <ol>
                <Text to="/profile">
                    <li><FaHome/> <span>Home</span> </li>
                    </Text> 

                    <Text to="/questionspage">
                    <li> <GoSearch /> <span>Questions</span></li>
                    </Text>

                    <Text to="/">
                    <li><MdOutlineAssignment /> <span>Assignments</span></li>
                    </Text>

                    <Text to="/tags">
                    <li><LiaTagsSolid /> <span>Tags</span></li>
                    </Text>

                </ol>
            </nav>
        </div>

    </SidebarBody>)
}
export default LeftSideBar;