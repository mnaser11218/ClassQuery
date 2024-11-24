import styled from "styled-components"
const PostBodyText = styled.textarea`
background:none;
display:block;
width: 100%;
min-height: 100px;
padding: 10px;
margin-bottom: 20px;
margin-top: 30px;
border: 1px solid #777;
border-radius: 5px;
color: #fff;
`
function PostBodyTextArea(){
    return (<PostBodyText/>)
}
export default PostBodyTextArea;