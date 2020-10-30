import styled from 'styled-components';

export const Container = styled.div`
  background: #323846;
  color: #ccd1dd;
  height: 7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadows.default};
  margin-bottom: 4rem;
`;

export const Content = styled.div`
  margin: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2rem;
  img {
    margin-left: 1rem;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }
  > svg {
    margin-left: 1rem;
  }
  li {
    svg {
      margin-right: 1rem;
    }
    padding: 2rem;
  }
  button {
    border: 0;
    background: transparent;
    color: inherit;
  }
`;
