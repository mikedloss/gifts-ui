import styled from 'styled-components';

const EmailInput = styled.input`
  width: 100%;
  height: 100%;
  color: #3D4852;
  font-size: 16px;
  padding: 8px 12px;
  line-height: 1.25;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #dae1e7;
  background-color: #F8FAFC; 

  @media screen and (max-width: 719px) {
    width: 94%;
  }

  &::placeholder {
    color: #B8C2CC;
  }
`

export default EmailInput;