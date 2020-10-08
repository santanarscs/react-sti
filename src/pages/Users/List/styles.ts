import styled from 'styled-components';

export const Container = styled.div`
  h1 {
    margin-bottom: 6rem;
  }
  table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;

    tr:nth-child(even) {
      background-color: rgba(0, 0, 0, 0.2);
    }
    td {
      padding: 1rem;
      img {
        height: 4rem;
        width: 3rem;
        border-radius: 0.5rem;
      }
    }
  }
`;

export const ContentTable = styled.div`
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radii.default};
  background: #323846;
`;
