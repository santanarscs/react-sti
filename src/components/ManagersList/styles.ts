import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
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
        &:last-child {
          text-align: right;
          width: 80px;
        }
      }
      &:hover td {
        background: #282828;
      }
    }
  }
  overflow-x: auto; /* Horizontal */
`;

export const RowButtons = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    border: 0;
    border-radius: 3px;
    margin-left: 5px;
    padding: 5px;
    font-size: 0.75rem;
    background: #bdc3c7;
    color: #333;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.1, `#bdc3c7`)};
    }
  }
  button + button {
    color: #fff;
    background-color: #e74c3c;
    &:hover {
      background: ${darken(0.1, `#e74c3c`)};
    }
  }
`;
