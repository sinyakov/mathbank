import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Statement = styled.textarea`
  margin: 8px 0;
  padding: 6px;
  width: 100%;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 2px #999;
  font-size: 16px;
`;

export const PreviewWrapper = styled.div`
  margin: 8px 0;
  padding: 6px;
  min-height: 70px;
  width: 100%;
  border: none;
  border-radius: 3px;
  background: #ddd;
  box-shadow: 0 0 2px #999;
  font-size: 14px;
`;

export const Category = styled.select`
  margin: 8px 0;
  padding: 6px;
  width: 40%;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 2px #999;
  font-size: 16px;
`;

export const Answer = styled.input`
  margin: 8px 0;
  padding: 6px;
  width: 55%;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 2px #999;
  font-size: 16px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
`;

export const Button = styled.button`
  display: block;
  padding: 4px 16px;
  border: none;
  border-radius: 6px;
  background-color: ${props =>
    (props.warn ? 'rgba(254, 54, 54, 0.714)' : 'rgba(255, 255, 255, 0.9)')};
  box-shadow: 0 0 1px #aaa;
  font-size: 17px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${props =>
    (props.warn ? 'rgba(254, 35, 35, 0.714)' : 'rgba(255, 255, 180, 0.9)')};
  }

  &:active {
    background-color: ${props =>
    (props.warn ? 'rgba(254, 10, 10, 0.714)' : 'rgba(255, 255, 140, 0.9)')};
    color: #000;
  }
`;
