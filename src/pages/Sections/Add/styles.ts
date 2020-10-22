import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 6rem;

  h1 {
    font-weight: normal;
    margin-bottom: 3.2rem;
  }
  form {
    background: #323846;
    padding: 2rem;
    border-radius: ${({ theme }) => theme.radii.default};
    box-shadow: ${({ theme }) => theme.shadows.default};
    > button {
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

export const Row = styled.div`
  display: flex;
  align-items: center;
  > div {
    flex: 1;
    margin-bottom: 1.5rem;
  }
  > div + div {
    margin-left: 1.5rem;
  }
`;
