import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
`;

export const NumberContainer = styled.div`
  display: flex;
`;

interface IItemProps {
  isSelect?: boolean;
}

export const Item = styled.div<IItemProps>`
  margin: 0 10px;
  cursor: pointer;
  ${(props) =>
    props.isSelect &&
    css`
      color: ${props.theme.colors.primary};
      font-weight: 500;
      border-bottom: 2px solid ${props.theme.colors.primary};
      padding: 0 3px;
    `}
`;
