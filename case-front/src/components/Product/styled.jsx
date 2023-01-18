import styled from "styled-components";

export const MyProduct = styled.div`
   display: flex;
   background-color: #d3d3d3;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   margin: 0 0 0.2vw 0;
   width: 80%;
   :hover{
      background-color: #90ee90;
   }
   p{
      font-size: 1vw;
      font-weight: bold;
      margin-left: 1vw;
      margin-right: 1vw;
   }
   button{
      background-color: #ffffff;
      box-shadow: 0.5px 1px 4px black;
      font-size: 1vw;
      font-weight: bold;
      color: #0000ff;
      border-radius: 3px;
      border: none;
      padding: .5vw;
      
      :active{
         background-color: #ffa500;
      }
      input{
         box-shadow: 1pxp 2px 5px;
         font-size: 1vw;
         width: fit-content;
      }

   }
`