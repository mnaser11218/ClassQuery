import styled, { createGlobalStyle } from "styled-components"
const GlobalStyles = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300,400;700&display=swap');
  body{
     background: #2d2d2d;
    //background: #244855;
    //background: rgb(117, 132, 106);
    // background: rgb(168 213 227);
    //background: hsl(0,0%,100%);
    color: #F8F7E5;
   // color: hsl(210,8%,25%);
    //color:#fff;
    //color: #FBE9B0;
   //background: rgb(29, 29, 29);
    //color: black;
    font-family: Roboto, arial, sans-serif;
    // font-family:var(--ff-sans);
    font-size: 17px;
    letter-spacing: 0.3px;
    line-height: 1.5;
  }
   
    hr{
    margin-top: 10px;
   border-top: 1px solid #F8F7E5;
    }
    b,strong{
    font-weight: bold;
    }
    a{
    color: #fff;
    }
    p{
    margin: 10px 0;
    line-height: 1.3=5rem;
    }
    h1,h2{
    margin-top: 15px;
    margin-bottom: 20px;
    }
    h1{
    font-size: 1.8rem;
    }
    h2{
    font-size: 1.6rem;
    }
    span{
    margin-left: 10px;
    }
    li{
    position: relative;
    margin: 5px;
    border: 1px #F8F7E5;
    border-radius: 5px;
    padding: 7px;
    &:hover{
    background-color: #748D92;
    cursor: pointer;
    }
    
    }
    blockquote{
    background-color: rgba(0,0,0, .1);
    padding: 15px;
    border-radius: 4px; 
    }
input.react-tags__combobox-input{
border: 1px solid #777;
border-radius: 3px;
padding:10px;
display: inline-block;
width: 100%;
    margin: 15px;

box-sizing: border-box: 
margin-bottom: 20px;
color: #fff;
background: none;
}

.tag{
    display: inline-block;
    letter-spacing: 0.5px;
    margin-right: 3px;
    border: solid 1px #F8F7E5;
    padding: 7px;
    margin: 7px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.8rem;
    font-family:var(--ff-sans);
    &:hover{
    color: #FF9900;
    //color: #748D92;
    border: none;
    }
} 
`

export default GlobalStyles;