import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 1rem;
  }
  margin-bottom: 1.5rem;
  span {
    padding-left: 1rem;
    margin-top: 0.7rem;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.error};
    svg {
      margin-right: 0.7rem;
    }
  }
  input {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: ${({ theme }) => theme.radii.default};
    border: 0.1rem solid rgba(0, 0, 0, 0.3);
    padding: 1rem 1.6rem;
    width: 100%;
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    & + div {
      margin-top: 0.8rem;
    }
  }
`;
