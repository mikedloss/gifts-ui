import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Button';
import EmailInput from '../EmailInput';
import axios from 'axios';
import { getApiUrl as api } from '../../utils/api';

const EmailSearchStyled = styled.div`
  margin-top: 50px;
`

const ErrorMessage = styled.small`
  color: #E3342F;
  font-weight: 700;
`

class EmailSearch extends Component {

  state = { 
    email: "",
    notFound: false,
    buttonMessage: "Search",
    buttonColor: "#5661B3",
    redirectToHistory: false
  }

  handleEmailChange = (event) => this.setState({ email: event.target.value, notFound: false })
  
  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.email) {
      this.setState({ error: false, buttonMessage: "Searching...", buttonColor: "#3490DC" }, () => {
        axios.get(`${api()}api/results?email=${this.state.email}`)
          .then(({ data }) => {
            this.setState({ redirectToHistory: true });
          })
          .catch(error => {
            console.log(`Nothing found for ${this.state.email}`);
            this.setState({
              notFound: true, 
              buttonMessage: "Search", 
              buttonColor: "#5661B3"
            });
          })
      })
    }
  }
  
  render() {
    return this.state.redirectToHistory ? 
    (
      <Redirect to={`/results/history/${this.state.email}`} />
    ) : (
      <EmailSearchStyled>
        <p>If you've already taken this survey, enter your email address below:</p>
        <form onSubmit={this.handleSubmit}>
          <EmailInput type="text"
              value={this.state.email}
              onChange={this.handleEmailChange}
              placeholder="me@email.com"
            />
          {this.state.notFound && (
            <ErrorMessage>
              Nothing found for {this.state.email}
            </ErrorMessage>
          )}
          <Button text={this.state.buttonMessage} 
            backgroundColor={this.state.buttonColor}
            extraStyles='padding: 8px 16px; margin-top: 10px;'
            type="submit"
          />
        </form>
      </EmailSearchStyled>
    )
  }
}

export default EmailSearch;