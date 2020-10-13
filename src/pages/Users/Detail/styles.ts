import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > div {
    display: flex;
  }
  img {
    width: 30rem;
    border-radius: ${({ theme }) => theme.radii.default};
  }
  ul {
    margin-left: 3rem;
    background: #323846;
    padding: 2rem;
    border-radius: ${({ theme }) => theme.radii.default};
    box-shadow: ${({ theme }) => theme.shadows.default};

    li {
      margin-bottom: 2rem;
      strong {
        margin-right: 0.5rem;
      }
    }
  }
`;
export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      text-transform: uppercase;
      margin-left: 1rem;
      background: ${({ theme }) => theme.colors.grey};
      color: ${({ theme }) => theme.colors.white};
      padding: 1rem 1.6rem;
      border-radius: ${({ theme }) => theme.radii.default};
      box-shadow: ${({ theme }) => theme.shadows.default};
      &:hover {
        background: ${({ theme }) => shade(0.2, theme.colors.grey)};
      }
    }
    button {
      text-transform: uppercase;
      margin-left: 1rem;
      background: ${({ theme }) => theme.colors.error};
      color: ${({ theme }) => theme.colors.white};
      padding: 1rem 1.6rem;
      border-radius: ${({ theme }) => theme.radii.default};
      box-shadow: ${({ theme }) => theme.shadows.default};
      &:hover {
        background: ${({ theme }) => shade(0.2, theme.colors.error)};
      }
    }
  }
`;
