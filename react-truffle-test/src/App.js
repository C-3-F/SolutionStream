import React, { Component } from 'react';
import HashnodeCrowdsale from '../build/contracts/HashnodeCrowdsale';
import getWeb3 from './utils/getWeb3';

import './css/oswald.css';
import './css/open-sans.css';
import './css/pure-min.css';
import './App.css';
import EthData from './EthData';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storageValue: 0,
      web3: null
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

        // Instantiate contract once web3 provided.
        this.instantiateContract();
      })
      .catch(() => {
        console.log('Error finding web3.');
      });
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract');
    const hashnodeCrowdsale = contract(HashnodeCrowdsale);
    hashnodeCrowdsale.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    var hashnodeCrowdsaleInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      hashnodeCrowdsale.deployed().then(instance => {
        this.setState({ hashnodeCrowdsaleInstance: instance });
      });
    });
  }

  render() {
    return (
      <div className="App" style={{ textAlign: 'center' }}>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"
        />
        <h1>Hashnode Crowdsale Recreation</h1>
        <hr />

        <div>{this.state.hashnodeCrowdsaleInstance.weiRaised}</div>

        <EthData />
      </div>
    );
  }
}

export default App;
