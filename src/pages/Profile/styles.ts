import styled from 'styled-components';
import { shade } from 'polished';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  margin-top: 6rem !important;
  background: #323846;
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radii.default};
  box-shadow: ${({ theme }) => theme.shadows.default};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: -6rem auto 0;
  width: 100%;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  align-self: center;
  margin-bottom: 2rem;
  img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
  }
  label {
    position: absolute;
    width: 3.2rem;
    height: 3.2rem;
    background: ${({ theme }) => theme.colors.primary};
    border: none;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
    cursor: pointer;
    input {
      display: none;
    }
    &:hover {
      background: ${({ theme }) => shade(0.2, theme.colors.primary)};
    }
    svg {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;
