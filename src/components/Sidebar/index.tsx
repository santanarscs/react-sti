import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiFileText, FiUser, FiSettings } from 'react-icons/fi';
import { Container, Nav } from './styles';

const Sidebar: React.FC = () => {
  return (
    <Container>
      <div>
        <Nav>
          <li>
            <NavLink to="/">
              <FiHome size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/documents">
              <FiFileText size={20} />
              <span>Audiências</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/managers">
              <FiUser size={20} />
              <span>Coordenadores</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users">
              <FiSettings size={20} />
              <span>Usuários</span>
            </NavLink>
          </li>
        </Nav>
      </div>
    </Container>
  );
};

export default Sidebar;
