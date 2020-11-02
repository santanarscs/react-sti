import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

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

interface IRowProps {
  status: 'ABERTO' | 'FECHADO';
}

export const Row = styled.tr<IRowProps>`
  td {
    height: 5.6rem;
  }
  td:first-child {
    padding-left: 1.6rem;
    border-radius: 1rem 0 0 1rem;
  }
  td:last-child {
    border-radius: 0 1rem 1rem 0;
    padding-right: 1.6rem;
    max-width: 50rem;
  }
  background: #323846;
  font-size: 16px;
  transition: background 0.3s;
  &:hover {
    cursor: pointer;
    background: ${shade(0.4, '#323846')};
  }
  ${({ status }) =>
    status === 'FECHADO' &&
    css`
      background: #31e184;
      color: #fff;
      &:hover {
        background: ${shade(0.4, '#31e184')};
      }
    `}
`;

export const SwitchContainer = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  span {
    margin-left: 1rem;
  }
`;
