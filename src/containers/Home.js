import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Intro from '../components/Home/Intro';
import EmailSearch from '../components/Home/EmailSearch';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { getApiUrl as api } from '../utils/api';

class Home extends Component {

  state = {
    loadingSurvey: true,
    loadingMessage: "Loading survey...",
    loadingError: false
  }

  componentDidMount = () => {
    this.wakeUpApi();
  }

  wakeUpApi = () => {
    axios.get(`${api()}api/heartbeat`)
      .then(({ data }) => {
        if (data.message === "ok") {
          this.setState({ loadingSurvey: false });
        }
      })
      .catch(error => {
        // server wasn't found
        console.error(error);
        this.setState({ loadingError: true, loadingSurvey: false, loadingMessage: "Unable to reach server" })
      });
  }

  render() {
    return (
      <div>
        <Intro />
        {this.state.loadingSurvey || this.state.loadingError ? (
          <Loading textColor={this.state.loadingError ? "#E3342F" : "#000"}>{this.state.loadingMessage}</Loading>
        ) : (
          <div>
            <Link to="/survey">
              <Button text="Start Survey"
                extraStyles="margin-top: 20px;" />
            </Link>
            <EmailSearch />
          </div>
        )}
      </div>
    )
  }
}

export default Home;