import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactDelayRender from 'react-delay-render';

const LoadingStyle = styled.div`
  font-weight: 700;
  color: ${props => props.textColor};
  margin-top: 20px;
`

const Loading = (props) => (
  <LoadingStyle textColor={props.textColor}>
    {props.children || "Loading..."}
  </LoadingStyle>
)

Loading.propTypes = {
  textColor: PropTypes.string
}

Loading.defaultProps = {
  textColor: "#000"
}

export default ReactDelayRender({ delay: 300 })(Loading);