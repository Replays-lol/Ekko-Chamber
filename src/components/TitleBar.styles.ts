import styled from 'styled-components';

export const TitleBarContainer = styled.div`
  height: 30px;
  background: #1a1a1a;
  -webkit-app-region: drag;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
`;

export const Title = styled.div`
  color: #fff;
  font-size: 14px;
  margin-left: 8px;
  font-weight: 700;
`;

export const WindowControls = styled.div`
  display: flex;
  -webkit-app-region: no-drag;
`;

export const Button = styled.button`
  border: none;
  background: transparent;
  color: #fff;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${props => props.color || '#333'};
  }
`; 