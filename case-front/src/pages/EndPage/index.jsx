import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { goToHome } from '../../routers/Coordinator';
import { MyEndPage } from './styled';

export default function EndPage() {
  const navigate = useNavigate()
  setTimeout(() => {
    goToHome(navigate)
  }, 2000);
  return (
    <>
      <Header />
      <MyEndPage>
        <h1>Pedido finalizado com sucesso!</h1>
        <h2>Obrigado(a) pela preferência!</h2>
      </MyEndPage>
    </>
  );
}