import styled from "styled-components";
 
export const Container = styled.div`
  height: auto;
 margin-top: 70px;
 min-height: 800px;
 display: flex;
 justify-content: space-around;
 align-items: center;
 position: relative;
 @media (max-width: 1100px){
       flex-direction: column-reverse;
       justify-content: initial;
       overflow: auto;
       height: auto;
       margin: 70px 0;
     }
`;

export const Content = styled.div`
 width: 100%;
 max-width: 600px;
 margin: 70px;
 background: rgb(229 231 235);
 border-radius: 10px;
 padding: 20px;
`;
