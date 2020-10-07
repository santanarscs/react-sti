import React from 'react';
import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import { Container, Content } from './styles';

const Header: React.FC = () => {
  const { signOut } = useAuth();

  function handleSignOut(): void {
    signOut();
  }
  return (
    <Container>
      <Content>
        <button type="button" onClick={handleSignOut}>
          <FiPower size={25} />
          Sair
        </button>
      </Content>
    </Container>
  );
};

export default Header;
