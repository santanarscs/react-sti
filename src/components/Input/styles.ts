import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  input {
    height: 5rem;
    padding: 1rem;
    border-radius: ${({ theme }) => theme.radii.default};
    border: 0.1rem solid rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 0, 0, 0.1);
    color: #ccd1dd;
    margin-top: 1rem;
    transition: border 0.15s ease;
    font-size: 1.6rem;
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
