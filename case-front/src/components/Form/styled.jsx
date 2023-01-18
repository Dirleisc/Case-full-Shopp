import styled from "styled-components";

export const MyOrderForm = styled.form`
   div
   {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      border: 3px solid #10453b;
      border-radius: 15px;
      padding: 0.4vw 0 0.2vw 0;
      width: 100%;
      margin-top: 50px;
      background-color: #f9b089;

      button{
         background-color: white;
         box-shadow: 0.5px 1px 4px black;
         font-size: 1vw;
         font-weight: bold;
         color: white;
         background-color: #0060c4;
         padding: .5vw 1vw .5vw 1vw;
         margin: .5vw 1vw;
         border-radius: 5px;
         border: none;
         

         :active{
            background-color: #278fe4;
         }
      }
   label{
      font-size: 1vw;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 20px;
      margin-top: 20px;
      
   }
   input{
      margin-bottom: 20px;
      margin-top: 20px;
      font-size: 1vw;
      padding: 0.5vw 1vw 0.5vw 1vw;
      box-shadow: 1px 2px 5px;
      border: none;
   }
   }
   #select-product{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      border: 3px solid #10453b;
      border-radius: 10px ;
      background-color: #e8e888;
      padding-bottom: 10px;

      p{
         font-size: 1.2vw;
         font-weight: bold;
      }
      label{
         font-size: 1vw;
         font-weight: bold;
         text-transform: uppercase;
         margin-bottom: 7px;
         margin-top: 7px;
      }
      input{
         margin-bottom: 7px;
         font-size: 1vw;
         padding: 0.2vw 1vw 0.2vw 1vw;
          box-shadow: 1px 2px 5px;
      }
   }
#select-client{
   justify-content: center;
   align-items: center;
   label{
   margin: 0.5vw;
   }
   input{
      width: 50vw;
   }
}
   #order{
      display: flex;
      flex-direction: column;
      align-items: center;
   }
   `
   
      