import styled from 'styled-components';

export const Container = styled.aside`
  position: fixed;
  z-index: 1;
  height: 100vh;
  background: ${({ theme }) => theme.colors.lightGrey};
  color: ${({ theme }) => theme.colors.darkGrey};
  width: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin-top: 2rem;
    letter-spacing: 0.5rem;
  }
  > button {
    background: none;
    margin-bottom: 2rem;
    svg {
      color: ${({ theme }) => theme.colors.darkGrey};
    }
  }
`;

export const Nav = styled.ul`
  list-style: none;
  li {
    display: flex;
    align-items: center;
    width: 100%;
    a {
      color: inherit;
      text-decoration: none;
      display: flex;
      align-items: center;
      padding: 2rem 0;
      svg {
        transition: color 0.2s ease;
      }
      &:hover {
        color: #fff;
        svg {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`;
