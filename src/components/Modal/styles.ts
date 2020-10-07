import styled, { keyframes } from 'styled-components';

interface IContentProps {
  size: 'big' | 'mediun' | 'small';
}
export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -40px, 0);
  }

  to {
    opacity: 1
    transform: translate3d(0, 0, 0);
  }
`;

export const Content = styled.div<IContentProps>`
  background: #36393f;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  padding: 40px;
  width: ${(props) => (props.size === 'big' ? 600 : 400)}px;
  animation: ${fadeIn} 0.5s;
  h1 {
    font-size: 26px;
    font-weight: 500;
    text-align: center;
    margin: 0 0 10px;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    > span {
      color: #b9bbbe;
      font-size: 14px;
      line-height: 16px;
      font-weight: 600;
      margin-top: 15px;
    }

    > button {
      margin: 20px 0 0;
    }
  }
`;
