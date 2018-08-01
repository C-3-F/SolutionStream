import React, { Component } from 'react';
import HashnodeCrowdsale from '../build/contracts/HashnodeCrowdsale';
import HashnodeToken from '../build/contracts/HashnodeToken';
import getWeb3 from './utils/getWeb3';
import { Grid } from 'semantic-ui-react';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';
import ContributeForm from './ContributeForm';

const ETH_WEI = 10 ** 18;

//change to what the crowdsale address is
const CROWDSALE_ADDRESS = '0xce4aadc91936035c7e2279bf8458a8c6c0249692';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      web3: null,
      hashnodeCrowdsaleInstance: null,
      ethRaised: 0,
      maxTokens: 0,
      goal: 0,
      cap: 0,
      rate: 0,
      startTime: '',
      startDate: '',
      endTime: '',
      endDate: '',
      ethInput: 0
    };
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        });
        console.log(this.state.web3);
        // Instantiate contract once web3 provided.
        this.instantiateContract();
      })
      .catch(() => {
        console.log('Error finding web3.');
      });
  }

  async instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract');
    const hashnodeCrowdsale = contract(HashnodeCrowdsale);
    const hashnodeToken = contract(HashnodeToken);
    hashnodeToken.setProvider(this.state.web3.currentProvider);
    hashnodeCrowdsale.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.

    const instance = await hashnodeCrowdsale.at(CROWDSALE_ADDRESS);
    this.setState({ hashnodeCrowdsaleInstance: instance });
    console.log(this.state.hashnodeCrowdsaleInstance);

    const tokenContractAddress = await this.state.hashnodeCrowdsaleInstance.token();
    const tokenContractInstance = hashnodeToken.at(tokenContractAddress);

    console.log(tokenContractInstance);

    const ethRaised =
      parseInt(await this.state.hashnodeCrowdsaleInstance.weiRaised(), 10) / ETH_WEI;
    this.setState({ ethRaised });
    // console.log(this.state.ethRaised);

    const decimals = parseInt(await tokenContractInstance.decimals(), 10);
    const maxTokens =
      parseInt(await this.state.hashnodeCrowdsaleInstance.maxTokens(), 10) / 10 ** decimals;
    this.setState({ maxTokens });
    // console.log(this.state.maxTokens);

    const goal = parseInt(await this.state.hashnodeCrowdsaleInstance.goal(), 10) / ETH_WEI;
    this.setState({ goal });
    // console.log(this.state.goal);

    const cap = parseInt(await this.state.hashnodeCrowdsaleInstance.cap(), 10) / ETH_WEI;
    this.setState({ cap });
    // console.log(this.state.cap);

    const rate = parseInt(await this.state.hashnodeCrowdsaleInstance.rate(), 10);
    this.setState({ rate });
    // console.log(this.state.rate);

    const startTime = new Date(
      parseInt(await this.state.hashnodeCrowdsaleInstance.startTime(), 10) * 1000
    ).toLocaleTimeString();
    this.setState({ startTime });
    // console.log(this.state.startTime);

    const startDate = new Date(
      parseInt(await this.state.hashnodeCrowdsaleInstance.startTime(), 10) * 1000
    ).toLocaleDateString();
    this.setState({ startDate });
    // console.log(this.state.startDate);

    const endTime = new Date(
      parseInt(await this.state.hashnodeCrowdsaleInstance.endTime(), 10) * 1000
    ).toLocaleTimeString();
    this.setState({ endTime });
    // console.log(this.state.endTime);

    const endDate = new Date(
      parseInt(await this.state.hashnodeCrowdsaleInstance.endTime(), 10) * 1000
    ).toLocaleDateString();
    this.setState({ endDate });
    // console.log(this.state.endDate);
  }

  render() {
    return (
      <div className="App" style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>Hashnode Crowdsale Recreation</h1>
        <hr />

        <div
          style={{
            backgroundColor: 'lightgray',
            width: '50%',
            borderRadius: '5px',
            boxShadow: '0 2px 10px 0 rgba(0,0,0,0.3)',
            margin: 'auto',
            marginTop: '100px',
            paddingTop: '50px',
            paddingBottom: '50px'
          }}
        >
          <h2 style={{ fontSize: '36px' }}>Hashnode Test Crowdsale</h2>
          <p style={{ fontSize: '24px' }}>{CROWDSALE_ADDRESS}</p>
          <h2 style={{ fontSize: '30px' }}>Amount Raised</h2>
          <p style={{ fontSize: '24px' }}>{this.state.ethRaised} ETH</p>
        </div>

        <ContributeForm
          className="form"
          web3={this.state.web3}
          contract={this.state.hashnodeCrowdsaleInstance}
        />

        <div style={{ marginTop: '50px' }}>
          <Grid columns="two" divided>
            <Grid.Row>
              <Grid.Column>
                <div className="cell-title">Rate</div>
                <div className="cell-content">1 ETH = {this.state.rate} Tokens</div>
              </Grid.Column>
              <Grid.Column>
                <div className="cell-title">Start Date</div>
                <div className="cell-content">
                  {this.state.startDate} - {this.state.startTime}
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <div className="cell-title">Max Supply</div>
                <div className="cell-content">{this.state.maxTokens}</div>
              </Grid.Column>
              <Grid.Column>
                <div className="cell-title">End Date</div>
                <div className="cell-content">
                  {this.state.endDate} - {this.state.endTime}
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <div className="cell-title">Goal</div>
                <div className="cell-content">{this.state.goal} ETH</div>
              </Grid.Column>
              <Grid.Column>
                <div className="cell-title">Cap</div>
                <div className="cell-content">{this.state.cap} ETH</div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
