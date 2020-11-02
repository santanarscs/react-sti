import styled from 'styled-components';
import { shade } from 'polished';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)``;

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
