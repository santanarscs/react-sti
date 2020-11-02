import React from 'react';

import { FiSettings, FiUsers, FiMonitor } from 'react-icons/fi';

import {
  Container,
  AnimatedWrapper,
  AnimatedContainer,
  AnimatedCard,
  Navigation,
} from './styles';
import { useAuth } from '../../hooks/auth';

import {
  DASHBOARD_ANIMATION,
  CONTAINER_ANIMATION,
  CARDS_ANIMATION,
} from './animations';

const DEFAULT_TRANSITION = { type: 'spring', mass: 1.3 };

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  return (
    <AnimatedWrapper
      variants={DASHBOARD_ANIMATION}
      initial="unMounted"
      animate="mounted"
      exit="unMounted"
      transition={{ duration: 0.5 }}
    >
      <h1>{`👋 Bem-vindo(a), ${user.name}`}</h1>
      <AnimatedContainer variants={CONTAINER_ANIMATION}>
        <Navigation>
          <AnimatedCard
            variants={CARDS_ANIMATION}
            transition={DEFAULT_TRANSITION}
            whileHover={{ y: -2, transition: DEFAULT_TRANSITION }}
            whileTap={{ y: 2, transition: DEFAULT_TRANSITION }}
          >
            <div>
              <FiSettings size={25} />
            </div>
            <span>32 chamados abertos</span>
          </AnimatedCard>
          <AnimatedCard
            variants={CARDS_ANIMATION}
            transition={DEFAULT_TRANSITION}
            whileHover={{ y: -2, transition: DEFAULT_TRANSITION }}
            whileTap={{ y: 2, transition: DEFAULT_TRANSITION }}
          >
            <div>
              <FiUsers size={25} />
            </div>
            <span>4 usuários cadastrados</span>
          </AnimatedCard>
          <AnimatedCard
            variants={CARDS_ANIMATION}
            transition={DEFAULT_TRANSITION}
            whileHover={{ y: -2, transition: DEFAULT_TRANSITION }}
            whileTap={{ y: 2, transition: DEFAULT_TRANSITION }}
          >
            <div>
              <FiMonitor size={25} />
            </div>
            <span>123 equipamentos cadastrados</span>
          </AnimatedCard>
        </Navigation>
        {/* <li>
          <div>
            <FiSettings size={25} />
            <span>Chamados abertos</span>
          </div>
          <strong>15</strong>
        </li>
        <li>
          <div>
            <FiUsers size={25} />
            <span>Usuários cadastrados</span>
          </div>
          <strong>10</strong>
        </li>
        <li>
          <div>
            <FiMonitor size={25} />
            <span>Equipamentos Cadastrados</span>
          </div>
          <strong>123</strong>
        </li> */}
      </AnimatedContainer>
    </AnimatedWrapper>
  );
};
export default Dashboard;
