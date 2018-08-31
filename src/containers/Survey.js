import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Question from '../components/Survey/Question';
import Button from '../components/Button';
import { getApiUrl as api } from '../utils/api';

const SurveyStyle = styled.div`
  touch-action: manipulation; /* disable double tap to zoom */
`

class Survey extends Component {

  state = {
    loading: true,
    allQuestions: [],
    userResponses: [],
    currentQuestionIndex: 0,
    results: {},
    goToResults: false
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this._handleKeyPress);

    axios.get(`${api()}api/questions`)
      .then(response => {
        if (response.status === 200) {
          this.setState({ 
            allQuestions: response.data,
            loading: false
          });
        }
      });
  }

  _handleKeyPress = (event) => {
    if (event.isTrusted) {
      let value = -1;
      switch(event.which) {
        case 97:
        case 49:  // Not at all (1)
          value = 0;
          break;
        case 98:
        case 50:  // Little (2)
          value = 1;
          break;
        case 99:
        case 51:  // Some (3)
          value = 2;
          break;
        case 100:
        case 52:  // Much (4)
          value = 3;
          break;
        default:
          break;
      }

      // only go forward if the value has been changed
      if (value !== -1) {
        this._nextQuestion(value, true);
      }
    }
  }

  _nextQuestion = (event, keypress=false) => {
    let newUserResponses = this.state.userResponses;
    
    newUserResponses = keypress === true
      ? newUserResponses.concat(event)
      : newUserResponses.concat(event.target.value)

    // console.log(newUserResponses);
    // console.log(this.state.currentQuestionIndex);

    if (this.state.currentQuestionIndex === this.state.allQuestions.length - 1) {
      this.setState({ loading: true }, _ => {
        this._submitSurvey(newUserResponses);
      });
    } else {
      this.setState({
        userResponses: newUserResponses,
        currentQuestionIndex: this.state.currentQuestionIndex + 1
      });
    }

  }

  _submitSurvey = (responses) => {
    let postData = {
      results: responses
    };
    axios.post(
      `${api()}/api/results`,
      postData
    ).then(({ data }) => {
      this.setState({ goToResults: true, results: data });
    })
  }

  render() {
    let currentQuestion = this.state.allQuestions[this.state.currentQuestionIndex],
        currentQuestionNumber = this.state.currentQuestionIndex + 1;
    return (
      <SurveyStyle>
        {this.state.loading && <span>Loading...</span>}
        {this.state.goToResults && <Redirect to={`/results/${this.state.results.uuid}`} />}
        {!this.state.loading && (
          <div>
            <Question number={currentQuestionNumber} max={this.state.allQuestions.length}>
              {currentQuestion.question}
            </Question>
            <div className="row">
              <div className="col-3">
                <Button text="Not at all (1)" clickme={this._nextQuestion} value="0" />
              </div>
              <div className="col-3">
                <Button text="Little (2)" clickme={this._nextQuestion} value="1" />
              </div>
              <div className="col-3">
                <Button text="Some (3)" clickme={this._nextQuestion} value="2" />
              </div>
              <div className="col-3">
                <Button text="Much (4)" clickme={this._nextQuestion} value="3" />
              </div>
            </div>
          </div>
        )}
      </SurveyStyle>
    )
  }
}

export default Survey;