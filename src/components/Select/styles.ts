import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 1rem;
  }
  > span {
    padding-left: 1rem;
    margin-top: 0.7rem;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.error};
    > svg {
      margin-right: 0.7rem;
    }
  }
  margin-bottom: 1.5rem;
`;
