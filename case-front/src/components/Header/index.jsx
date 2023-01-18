import React from 'react';
import logo from '../../assets/img/logo.jpg'
import { MyHeader, MyLogo } from './styled';

 export default function Header() {
   return(
      <MyHeader>
         <MyLogo src={logo}/>
      </MyHeader>
   );
 };

