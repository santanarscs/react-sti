import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  h1 {
    margin-bottom: 2rem;
  }
`;

export const AnimatedWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2rem;
    font-weight: normal;
  }
`;
export const AnimatedContainer = styled(motion.div)`
  ${({ theme }) => css`
    width: 100%;
    min-height: 12rem;
    height: auto;
    display: flex;
    flex-shrink: 0;
  `}
`;

export const Navigation = styled.nav`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  grid-gap: 1rem;
`;

export const AnimatedCard = styled(motion.button)`
  ${({ theme }) => css`
    min-height: 12rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: #323846;
    padding: 2rem;

    color: ${theme.colors.grey};
    border-radius: ${theme.radii.default};
    padding: 2rem;
    box-shadow: ${theme.shadows.default};
    font-size: ${theme.fontSizes.default};
    div {
      max-width: 8.4rem;
      max-height: 8.4rem;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    svg {
      stroke: ${theme.colors.primary};
      stroke-width: 1.5;
      max-height: 2.4rem;
      height: 100%;
      width: auto;
    }
  `}
`;
