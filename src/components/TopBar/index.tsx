import React from 'react';

import { FiChevronDown, FiPower, FiUser } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

import { Container, Content, Profile } from './styles';
import Dropdown from '../Dropdown';

const TopBar: React.FC = () => {
  const { user, signOut } = useAuth();
  return (
    <Container>
      <Content>
        <Profile>
          <span>{user.name}</span>
          <Dropdown icon={FiChevronDown}>
            <li>
              <button type="button">
                <FiUser size={20} />
                <span>Perfil</span>
              </button>
            </li>
            <li>
              <button type="button" onClick={signOut}>
                <FiPower size={20} />
                <span>Sair</span>
              </button>
            </li>
          </Dropdown>
          <img src={`https://ui-avatars.com/api/?name=${user.name}`} alt="" />
        </Profile>
      </Content>
    </Container>
  );
};

export default TopBar;
