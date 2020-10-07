import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const Content = styled.div`
  width: 100%;
  margin-left: 200px;
  flex: 1;
  display: flex;
  flex-direction: column;
  @media (max-width: 900px) {
    margin: 40px auto;
  }
`;
