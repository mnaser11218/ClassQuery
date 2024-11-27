import styled from "styled-components";

const SidebarBody = styled.div`
border-right: 1px solid #777;

`
function LeftSideBar(){
    return (<SidebarBody >
        <div style={{"padding": "30px"}}>
            <nav>
                <ol>
                    <li style={{"position": "relative", "margin": "15px", "border": "solid 1px white", "padding": "7px"}}>
                   <a>Home </a> 
                    </li>
                    <li style={{"position": "relative", "margin": "15px"}}>
       <a>Question </a> 
</li>
<li style={{"position": "relative", "margin": "15px"}}>
<a>Assignments</a> 
</li>
                </ol>
            </nav>
        </div>

    </SidebarBody>)
}
export default LeftSideBar;