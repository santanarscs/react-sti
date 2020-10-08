import styled from 'styled-components';

export const Container = styled.div`
  h1 {
    margin-bottom: 2rem;
  }
  form {
    background: #323846;
    padding: 2rem;
    border-radius: ${({ theme }) => theme.radii.default};
    box-shadow: ${({ theme }) => theme.shadows.default};
    button {
      width: 14rem;
      margin-left: auto;
      color: ${(props) => props.theme.colors.white};
      text-transform: uppercase;
      font-weight: 500;
      background: ${(props) => props.theme.colors.primary};
      height: 5rem;
      border-radius: ${({ theme }) => theme.radii.default};
      margin-top: 1.6rem;
    }
  }
`;
