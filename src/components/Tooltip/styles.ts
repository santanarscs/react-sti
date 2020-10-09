import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  span {
    width: 16rem;
    background: ${({ theme }) => theme.colors.primary};
    padding: 0.8rem;
    border-radius: 0.4rem;
    font-size: 1.4rem;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    position: absolute;
    bottom: calc(100% + 1.2rem);
    left: 50%;
    transform: translateX(-50%);
    color: ${({ theme }) => theme.colors.white};
    &::before {
      content: '';
      border-style: solid;
      border-color: ${({ theme }) => theme.colors.primary} transparent;
      border-width: 0.6rem 0.6rem 0 0.6rem;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
