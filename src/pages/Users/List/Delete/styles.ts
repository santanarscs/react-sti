import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  P {
    padding: 2rem;
  }
  div {
    display: flex;
    justify-content: flex-end;
    button {
      border: 0;
      height: 4rem;
      padding: 0 1rem;
      background: transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-transform: uppercase;
      font-size: 1.6rem;
      color: ${(props) => props.theme.colors.white};
      transition: color 0.2s;
    }
    button + button {
      margin-left: 1rem;
      border-radius: 0.5rem;
      background: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.white};
      transition: background 0.2s;
      &:hover {
        background: ${({ theme }) => shade(0.2, theme.colors.primary)};
      }
    }
  }
`;
