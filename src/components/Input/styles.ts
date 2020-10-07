import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  input {
    height: 4rem;
    padding: 1rem;
    border-radius: 0.3rem;
    border: 0.1rem solid rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 0, 0, 0.1);
    color: #f6f6f6;
    margin-top: 0.8rem;
    transition: border 0.15s ease;
    font-size: 1.6rem;
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
