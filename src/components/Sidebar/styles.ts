import styled from 'styled-components';

export const Container = styled.aside`
  position: fixed;
  z-index: 1;
  height: 100vh;
  background: #36393f;
  color: #b3b3b3;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
    padding: 2rem;
  }
  @media (max-width: 900px) {
    width: 100%;
    height: 60px;
    bottom: 0 !important;
    left: 0;
    > div {
      padding: 0;
    }
  }
  @media (max-width: 500px) {
    display: flex;
    justify-content: space-around;
  }
`;

export const Nav = styled.ul`
  list-style: none;
  margin-top: 120px;
  li {
    display: flex;
    align-items: center;

    a {
      color: inherit;
      text-decoration: none;
      display: flex;
      align-items: center;
      span {
        font-size: 0.75rem;
        text-transform: uppercase;
        line-height: 3rem;
        font-weight: 'normal';
      }
      svg {
        margin-right: 5px;
      }
    }
    &:hover {
      color: #fff;
    }
  }

  @media (max-width: 900px) {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 5px;
  }
  @media (max-width: 500px) {
    span {
      display: none;
    }
  }
`;
