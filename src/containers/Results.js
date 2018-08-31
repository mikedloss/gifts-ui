import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Results/Card';
import Gift from '../components/Results/Gift';
import EmailForm from '../components/Results/EmailForm';
import Loading from '../components/Loading';
import { getApiUrl as api } from '../utils/api';

const SplitRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  p { margin: 0; }
`

const LinkToHistory = styled(Link)`
  text-decoration: none;
  color: #42613c;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`

class Results extends Component {

  state = {
    loading: true,
    results: null,
    multiple: false,
    redirectToHome: false
  }

  componentDidMount = () => {
    // debugger;
    const { params } = this.props.match;
    
    if (!params.uuid) {
      this.setState({ redirectToHome: true });
    } else {
      axios.get(`${api()}api/results?uuid=${params.uuid}`)
        .then(({ data }) => {
          console.log(data);
          this.setState({ results: data[0], loading: false });
        })
        .catch(error => {
          console.log("No results found");
          this.setState({ redirectToHome: true });
        });
    }
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div>
        {this.state.loading && <Loading />}
        {this.state.redirectToHome && <Redirect to='/' />}
        {!this.state.loading && !this.state.multiple &&
          <div>
            <h1>Results</h1>
            <SplitRow>
              <p>Here are the results from your survey</p>
              {this.state.results.email && (
                <LinkToHistory to={`/results/history/${this.state.results.email}`}>
                  View all results for {this.state.results.email}
                </LinkToHistory>
              )}
            </SplitRow>
            {this.state.results &&
              <Card header="Primary Gifts" headerColor="#1C3D5A">
                <Gift number={1} gift={this.state.results.primary1} />
                <Gift number={2} gift={this.state.results.primary2} />
                <Gift number={3} gift={this.state.results.primary3} />
              </Card>
            }
            {this.state.results &&
              <Card header="Secondary Gifts" headerColor="#1A4731">
                <Gift number={4} gift={this.state.results.secondary1} />
                <Gift number={5} gift={this.state.results.secondary2} />
                <Gift number={6} gift={this.state.results.secondary3} />
              </Card>
            }
            <EmailForm results={this.state.results} />
          </div>
        }
      </div>
    )
  }
}

export default withRouter(Results);