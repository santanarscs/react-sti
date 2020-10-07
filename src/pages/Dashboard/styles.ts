import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 10px auto;
  padding: 0 20px;
  @media (max-width: 600px) {
    margin: 5px 0;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 40px;
    height: 40px;
    animation: ${rotate} 2s linear infinite;
  }
`;

export const HeadContent = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 20px;
  h1 {
    margin-bottom: 20px;
    font-size: 2rem;
  }
  > div {
    display: flex;
    input[type='file'] {
      display: none;
    }
    label {
      display: flex;
      align-items: center;
      align-items: center;
      cursor: pointer;
      font-size: 1rem;
      height: 40px;
      padding: 0 10px;
      margin-right: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: none;
      border-radius: 3px;
      color: #fff;
      background: #9b59b6;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.1, '#9b59b6')};
      }
      svg {
        margin-right: 0.3rem;
      }
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      border: none;
      background: #3498db;
      color: #fff;
      height: 40px;
      padding: 0 10px;
      border-radius: 3px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.1, '#3498db')};
      }
      svg {
        margin-right: 0.3rem;
      }
    }
  }
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
export const Content = styled.div`
  background: #36393f;
  padding: 20px;
  border-radius: 3px;
  font-size: 1.3rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    thead th {
      font-size: 0.75rem;
      color: #b3b3b3;
      letter-spacing: 1.11px;
      font-weight: normal;
      text-transform: uppercase;
      padding: 5px 10px;
    }
    tr {
      td {
        border-top: 1px solid #282828;
        font-size: 13px;
        padding: 10px;
        background: transparent;
        color: #fff;
      }
      &:hover td {
        background: #282828;
      }
    }
  }
  overflow-x: auto; /* Horizontal */
`;

export const SearchContent = styled.div`
  background: #36393f;
  padding: 20px;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;
