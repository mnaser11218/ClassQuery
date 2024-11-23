import { Link } from "react-router-dom"
import styled from "styled-components"
const StyledUserLink = styled(Link)`
color: #3ca4ff;

`
function UserLink({...props}){
    return(<StyledUserLink to="/users/" {...props}/>)
}
export default UserLink;