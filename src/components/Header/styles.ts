import styled from 'styled-components';

export const Container = styled.div`
  @media (max-width: 500px) {
    padding: 0 10px;
  }
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1200px;
  margin: 0 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  button {
    border: none;
    background: transparent;
    color: #e74c3c;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-weight: 500;
    svg {
      margin-right: 5px;
    }
  }

  @media (max-width: 690px) {
    height: 30px;
  }
  @media (max-width: 540px) {
    height: 20px;
  }
`;
