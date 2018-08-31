import React from 'react';
import styled from 'styled-components';

const FooterStyle = styled.div`
  margin-top: 40px;
  font-size: 12px;
  p { 
    color: #868e96;
    margin: 0; 
  }
  a { 
    color: #0056b3;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const Footer = () => (
  <FooterStyle>
    <p>
      Created with <span role="img" aria-label="love">❤️</span> by Mike DLoss from <a href="https://harvestland.church" target="_blank" rel="noopener noreferrer">Harvestland Church</a>, located in Clarkston, MI, USA.
    </p>
    <p>Please freely use this survey within your church.</p>
  </FooterStyle>
)

export default Footer;