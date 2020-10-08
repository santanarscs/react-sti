import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  h1 {
    margin-bottom: 6rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1.5rem;
  tr {
    th {
      font-size: 1.8rem;
      font-weight: 500;
    }
    th:first-child {
      text-align: left;
      padding-left: 1.6rem;
    }
    th:last-child {
      text-align: right;
      padding-right: 1.6rem;
    }
  }
`;

export const Row = styled.tr`
  td {
    height: 5.6rem;
  }
  td:first-child {
    padding-left: 1.6rem;
    border-radius: 1rem 0 0 1rem;
  }
  td:last-child {
    text-align: right;
    border-radius: 0 1rem 1rem 0;
    padding-right: 16px;
  }
  background: #323846;
  font-size: 16px;
  transition: background 0.3s;
  &:hover {
    cursor: pointer;
    background: ${shade(0.4, '#323846')};
  }
`;

export const MenuActionItem = styled.li`
  width: 100%;
  padding: 10px 30px;
  cursor: pointer;
  border-bottom: 1px solid #3b414e;
  transition: color 0.2s;
  font-weight: normal;
  a {
    display: flex;
    text-decoration: none;
    color: #ccd1dd;
    transition: color 0.2s;
    font-weight: normal;
  }
  button {
    display: flex;
    border: 0;
    background: transparent;
    color: #ccd1dd;
    transition: color 0.2s;
  }
  svg {
    margin-right: 5px;
  }
  &:hover {
    svg {
      color: ${(props) => props.theme.colors.primary};
    }
    a {
      color: ${(props) => props.theme.colors.primary};
    }
    button {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;
