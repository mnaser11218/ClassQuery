import styled from "styled-components";

const WholePage = styled.div`
display: grid;
grid-template-columns: 250px 1fr 150px;
  height: 100vh;
   grid-template-rows: auto 1fr;
    @media (max-width: 768px) {
    height: 100%;
    grid-template-columns: 1fr; /* Full-width layout for mobile */
    grid-template-rows: auto 1fr; /* Keep header on top */
    width: 100%;
  }
`
export default WholePage;