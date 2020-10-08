import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const Badge = styled.button`
  background: transparent;
  margin-bottom: 5px;
  border: 0;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
  svg {
    color: #ccd1dd;
  }
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const enter = keyframes`
from {
    opacity: 0;
    transform: scaleY(0.98) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

interface IItemListProps {
  open: boolean;
}

export const ItemList = styled.ul<IItemListProps>`
  list-style: none;
  position: absolute;
  right: 0;
  background: #323846;
  box-shadow: ${({ theme }) => theme.shadows.default};
  display: ${(props) => (props.open ? 'block' : 'none')};
  z-index: 1;
  animation: ${enter} 0.2s ease forwards;
  border-radius: 5px;
  padding: 10px;
`;
