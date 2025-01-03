import styled from "styled-components"
const H1HeaderTag = styled.h1`
// color: white;
// font-size: 1.8rem;
font-family: arial;
margin: 10px;
  font-size: 2rem;
  font-weight: bold;
  color: #3498db;
  opacity: 0;
  transform: translateY(50px);
  animation: fadeInSlideUp 2s ease-out forwards;


@keyframes fadeInSlideUp {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

export default H1HeaderTag;