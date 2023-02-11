import styled from "styled-components";

export const Container = styled.ul`
  margin-top: 20px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;
    border: 2px solid #006d77;
    border-radius: 10px;
    padding: 5px;
    & + li {
      margin-top: 5px;
    }
  }
  li:hover{
      background: #edf6f9;
      cursor: pointer;
    }
`;

export const FileInfo = styled.div`
   display: flex;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    span {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
      button {
        border: 0;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;

interface PreviewProps {
  src?: string;
}

export const Preview = styled.div<PreviewProps>`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
`;