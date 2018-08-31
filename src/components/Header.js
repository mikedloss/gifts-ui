import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderStyle = styled.div`
  margin-top: 28px;
  margin-bottom: 40px;
`

const TitleLink = styled(Link)`
  font-size: 42px;
  font-weight: 700;
  text-decoration: none;
  margin-bottom: 5px;
  @media screen and (max-width: 719px) {
    font-size: 24px;
  }
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #42613c;
  }
`

const Subtitle = styled.p`
  margin-top: 10px;
  @media screen and (max-width: 720px) {
    display: none;
  }
`

const Header = () => (
  <HeaderStyle>
    <TitleLink to='/'>Spiritual Gifts Survey</TitleLink>
    <Subtitle>Finding your place in ministry</Subtitle>
  </HeaderStyle>
)

export default Header;