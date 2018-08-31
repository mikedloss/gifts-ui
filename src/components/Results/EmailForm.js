import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isEmail from 'validator/lib/isEmail';
import axios from 'axios';
import Button from '../Button';
import EmailInput from '../EmailInput';
import { getApiUrl as api } from '../../utils/api';

const EmailFormStyle = styled.form``

const Instructions = styled.p`
  font-weight: 700;
  font-size: 24px;
  text-align: center;
`

const ErrorMessage = styled.small`
  color: #E3342F;
  font-weight: 700;
`

class EmailForm extends Component {

  state = { 
    email: "", 
    error: false,
    buttonMessage: "Submit",
    buttonColor: "#5661B3"
  }

  componentDidMount = () => {
    if (this.props.results.email) {
      this.setState({ 
        email: this.props.results.email,
        buttonMessage: "Resend"
      })
    }
  }
  

  handleEmailChange = (event) => this.setState({ email: event.target.value })

  handleEmailUpdate = (event) => {
    event.preventDefault();

    const { email } = this.state;

    if (isEmail(email)) {
      this.setState({ error: false, buttonMessage: "Sending...", buttonColor: "#3490DC" }, () => {
        // send a PUT to the api and update the email
        axios({
          method: 'PUT',
          url: `${api()}api/results/${this.props.results.uuid}`,
          data: { email }
        })
        .then(res => {
          if (res.status === 200) {
            this.setState({ buttonMessage: 'Sent!', buttonColor: "#42613c", email: "" });
          }
        });
      });
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    return (
      <EmailFormStyle onSubmit={this.handleEmailUpdate}>
        {this.props.results.email ? (
          <div>
            <Instructions>Want to resend these results to your inbox?</Instructions>
            <Button text={this.state.buttonMessage} 
              backgroundColor={this.state.buttonColor}
              extraStyles='padding: 8px 16px;'
              type="submit"
            />
          </div>
        ) : (
          <div>
            <Instructions>Want to send these results to your inbox?<br />Enter your email below.</Instructions>
            <div className="row">
              <div className="col-12">
                <EmailInput type="text" 
                  value={this.state.email}
                  onChange={this.handleEmailChange} 
                  placeholder="me@email.com" />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {this.state.error && (
                  <ErrorMessage>
                    Email is invalid
                  </ErrorMessage>
                )}
                <Button text={this.state.buttonMessage} 
                  backgroundColor={this.state.buttonColor}
                  extraStyles='padding: 8px 16px;'
                  type="submit"
                />
              </div>
            </div>
            <div className="row">
              <small>Your email is just used to save results so you can view them later... nothing else!</small>
            </div>
          </div>
        )}
      </EmailFormStyle>
    )
  }
}

EmailForm.propTypes = {
  results: PropTypes.object.isRequired
}

export default EmailForm;