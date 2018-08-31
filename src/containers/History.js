import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import MultipleResults from '../components/History/MultipleResults';
import { getApiUrl as api } from '../utils/api';

class History extends Component {

  state = {
    results: null,
    email: "",
    redirectToHome: false
  }

  componentDidMount = () => {
    // get data for results if they don't exist in our props
    if (this.props.location.state) {
      this.setState({ results: this.props.location.state });
    } else {
      let email = this.props.match.params.email;

      if (!email) this.setState({ redirectToHome: true });

      axios.get(`${api()}api/results?email=${email}`)
        .then(({ status, data }) => {
          this.setState({ results: data, email });
        })
        .catch(error => {
          console.log(`No history found for ${email}`);
          this.setState({ email });
        })
    }
  }
  
  render() {
    return (
      <div>
        {this.state.redirectToHome && <Redirect to='/' />}
        {this.state.results ? 
          (
            <div>
              <MultipleResults 
                results={this.state.results}
                email={this.state.email}
              />
            </div>
          ) : ( 
            <h3>No results found for {this.state.email}</h3> 
          )
        }
      </div>
    )
  }
}

export default withRouter(History);