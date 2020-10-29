import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > div {
    display: flex;
  }
  ul {
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
  margin-top: 6rem;
  margin-bottom: 3.2rem;
  h1 {
    font-weight: normal;
  }

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
  }
`;

export const SolvedButton = styled.button`
  text-transform: uppercase;
  margin-left: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem 1.6rem;
  border-radius: ${({ theme }) => theme.radii.default};
  box-shadow: ${({ theme }) => theme.shadows.default};
  &:hover {
    background: ${({ theme }) => shade(0.2, theme.colors.primary)};
  }
`;

export const DeleteButton = styled.button`
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
`;
