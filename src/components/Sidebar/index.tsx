import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiSettings,
  FiUsers,
  FiCalendar,
  FiMonitor,
  FiMapPin,
  FiMap,
} from 'react-icons/fi';
import { Container, Nav } from './styles';

const Sidebar: React.FC = () => {
  return (
    <Container>
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
            <NavLink to="/sections" activeClassName="is-active">
              <FiMapPin size={20} />
              <span>Seções</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/equipaments" activeClassName="is-active">
              <FiMonitor size={20} />
              <span>Equipamentos</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" activeClassName="is-active">
              <FiSettings size={20} />
              <span>Pedido de serviços</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/spots" activeClassName="is-active">
              <FiMap size={20} />
              <span>Locais</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/appointments" activeClassName="is-active">
              <FiCalendar size={20} />
              <span>Agendamento</span>
            </NavLink>
          </li>
        </Nav>
      </div>
    </Container>
  );
};

export default Sidebar;
