import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GiftStyle = styled.div`
  margin-top: 2rem;
`
const GiftTitle = styled.h3`
  margin: 0 auto;
`
const GiftDescription = styled.p`
  margin-top: 5px;
  margin-bottom: 0;
`
const GiftScripture = styled.small`
  margin: 0;
  font-style: italic;
`

const Gift = ({ number, gift }) => (
  <GiftStyle>
    <GiftTitle>{number}. {gift.title}</GiftTitle>
    <GiftDescription>{gift.description}</GiftDescription>
    <GiftScripture>Verses: {gift.verses}</GiftScripture>
  </GiftStyle>
)

Gift.propTypes = {
  number: PropTypes.number.isRequired,
  gift: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    verses: PropTypes.string.isRequired
  })
}

export default Gift;