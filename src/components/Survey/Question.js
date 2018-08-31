import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const QuestionStyle = styled.div`
  height: 250px;
  @media screen and (max-width: 719px) {
    height: 210px;
  }
`

const QuestionNumber = styled.h4`
  @media screen and (max-width: 719px) {
    font-size: 12px;
    margin: 6px 0;
  }
`

const QuestionText = styled.h1`
  font-size: 32px;
  line-height: 40px;
  @media screen and (max-width: 719px) {
    font-size: 22px;
    line-height: 30px;
    margin: 12px 0;
  }
`

class Question extends Component {
  render() {
    return (
      <QuestionStyle>
        <QuestionNumber>{this.props.number} of {this.props.max}</QuestionNumber>
        <QuestionText>{this.props.children}</QuestionText>
      </QuestionStyle>
    )
  }
}

Question.propTypes = {
  number: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired
}


export default Question;