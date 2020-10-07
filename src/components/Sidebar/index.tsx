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
            <NavLink to="/">
              <FiHome size={30} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/users">
              <FiUsers size={30} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/users">
              <FiSettings size={30} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/users">
              <FiCalendar size={30} />
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
