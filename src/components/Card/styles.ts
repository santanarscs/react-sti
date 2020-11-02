import styled from 'styled-components';

export const Container = styled.div`
  background: #323846;
  padding: 2rem;
  border-radius: ${({ theme }) => theme.radii.default};
  box-shadow: ${({ theme }) => theme.shadows.default};
  display: flex;
  flex-direction: column;
`;
