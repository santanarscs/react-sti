import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiSettings,
  FiPower,
  FiUsers,
  FiCalendar,
} from 'react-icons/fi';
import { Container, Nav } from './styles';

const Sidebar: React.FC = () => {
  return (
    <Container>
      <h1>STI</h1>
      <div>
        <Nav>
          <li>
            <NavLink to="/dashboard" activeClassName="is-active">
              <FiHome size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" activeClassName="is-active">
              <FiUsers size={20} />
              <span>Usuários</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" activeClassName="is-active">
              <FiSettings size={20} />
              <span>Pedido de serviços</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/appontiments" activeClassName="is-active">
              <FiCalendar size={20} />
              <span>Agendamento</span>
            </NavLink>
          </li>
        </Nav>
      </div>
      <button type="button">
        <FiPower size={20} />
      </button>
    </Container>
  );
};

export default Sidebar;
