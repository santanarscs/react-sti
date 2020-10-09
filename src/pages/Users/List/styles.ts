import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  h1 {
    margin-bottom: 2rem;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  a {
    display: flex;
    font-weight: 500;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};
    text-transform: uppercase;
    height: 5rem;
    padding: 0 1rem;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.radii.default};
    box-shadow: ${({ theme }) => theme.shadows.default};
    &:hover {
      background: ${({ theme }) => shade(0.2, theme.colors.primary)};
    }
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
      text-align: left;
    }
    th:first-child {
      padding-left: 1.6rem;
    }
    th:last-child {
      padding-right: 1.6rem;
    }
  }
`;

export const Row = styled.tr`
  td {
    height: 5.6rem;
    img {
      height: 4rem;
      width: 3rem;
      border-radius: ${({ theme }) => theme.radii.default};
    }
  }
  td:first-child {
    padding-left: 1.6rem;
    border-radius: 1rem 0 0 1rem;
  }
  td:last-child {
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
