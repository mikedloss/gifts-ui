import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';

const CardStyle = styled.div`
  margin: 24px auto;
  padding: 1rem;
  box-shadow: 0 5px 5px 0 rgba(0,0,0,.08), 0 5px 15px 0 rgba(0,0,0,.08);
  border-radius: .25rem;
  border: 1px solid ${props => lighten(0.65, props.headerColor)};
  h2 {
    color: ${props => props.headerColor};
    margin: 0;
  }
  h3 {
    color: ${props => lighten(0.1, props.headerColor)}
  }

  @media screen and (max-width: 719px) {
    box-shadow: none;
    padding: 0;
    margin: 24px auto;
    border: none;
  }
`

const Card = (props) => (
  <CardStyle
    headerColor={props.headerColor}
  >
    <h2>{props.header}</h2>
    {props.children}
  </CardStyle>
)

Card.propTypes = {
  header: PropTypes.string,
  headerColor: PropTypes.string
}

Card.defaultProps = {
  headerColor: '#3d4852'
}

export default Card;