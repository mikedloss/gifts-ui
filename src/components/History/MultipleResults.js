import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

const TopPart = styled.div`
  margin-bottom: 40px;
  h3 { margin-bottom: 0; }
  p { margin-top: 0; }
`

const Email = styled.span`
  color: #5661B3;
`

const ResultInfo = styled.div`
  margin: 20px 0;

  p {
    margin: 0;
    font-style: italic;
    color: #8795A1;
  }
`

const StyledLink = styled(Link)`
  color: #42613c;
  font-weight: 700;
  text-decoration: none;

  &:hover { text-decoration: underline; }
`

const MultipleResults = (props) => {
  return (
    <div>
      <TopPart>
        <h3>
          Result history for <Email>{props.email}</Email>
        </h3>
        <p>Please pick one below:</p>
      </TopPart>
      {props.results.map(result => {
        let primaryGifts = `Primary Gifts: ${[result.primary1.title, result.primary2.title, result.primary3.title].join(", ")}`
        let secondaryGifts = `Secondary Gifts: ${[result.secondary1.title, result.secondary2.title, result.secondary3.title].join(", ")}`

        return (
          <ResultInfo className="row" key={result.id}>
            <StyledLink to={`/results/${result.uuid}`}>
              {moment(result.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}
            </StyledLink>

            <p>{primaryGifts}</p>
            <p>{secondaryGifts}</p>
          </ResultInfo>
        )
      })}
    </div>
  )
}

MultipleResults.propTypes = {
  results: PropTypes.array.isRequired,
  email: PropTypes.string.isRequired
}

export default MultipleResults;