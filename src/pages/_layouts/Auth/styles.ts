import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const AnimatedContainer = styled(motion.main)`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 36rem;
    padding: 3.2rem;
    background: ${theme.colors.background};
    border-radius: ${theme.radii.default};
    box-shadow: ${theme.shadows.default};
    form {
      min-width: 40rem;
      img {
        align-self: center;
        margin-bottom: 2rem;
        width: 10rem;
      }
      h1 {
        font-size: 3rem;
      }
      padding: 3rem;
      background: #323846;
      border-radius: ${theme.radii.default};
      display: flex;
      flex-direction: column;
    }
  `}
`;

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
