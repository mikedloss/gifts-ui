import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';

const ButtonStyle = styled.button`
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: ${props => props.textColor};
  width: 100%;
  border: 1px solid white;
  border-radius: 5px;
  background-color: ${props => props.backgroundColor};
  padding: 20px 0;

  ${props => props.extraStyles}

  transition: all 0.3s ease;
  &:hover {
    background-color: ${props => lighten(0.1, props.backgroundColor)};
  }
`

class Button extends Component {

  render() {
    return (
        <ButtonStyle
          backgroundColor={this.props.backgroundColor}
          textColor={this.props.textColor}
          extraStyles={this.props.extraStyles}
          onClick={this.props.clickme}
          {...this.props}
        >
          {this.props.text}
        </ButtonStyle>
    )
  }
}

Button.propTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  extraStyles: PropTypes.string,
  text: PropTypes.string.isRequired,
  clickme: PropTypes.func
}

Button.defaultProps = {
  backgroundColor: "#04637f",
  textColor: "#fff"
}

export default Button;