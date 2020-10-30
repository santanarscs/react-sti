import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
`;

export const Content = styled.div`
  width: 100%;
  margin-left: 20rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  > div + div {
    margin: 0 2rem 0 2rem;
  }
  @media (max-width: 1109px) {
    margin-left: 8rem;
  }
`;
