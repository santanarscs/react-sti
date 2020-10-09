import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -2rem, 0);
  }
  to {
    opacity: 1
    transform: translate3d(0, 0, 0);
  }
`;
export const Content = styled.div`
  background: #323846;
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.flat};
  padding: 2rem 4rem;
  width: 60rem;
  animation: ${fadeIn} 0.5s;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 2.2rem;
  }
  svg {
    color: ${(props) => props.theme.colors.white};
  }
  button {
    border: 0;
    background: transparent;
  }
`;
