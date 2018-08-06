var HDWalletProvider = require('truffle-hdwallet-provider');
var mnemonic = 'melody adjust door gauge equip pledge taste decorate night dilemma lion vague';

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      gas: 4712387,
      network_id: '5777'
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/uXb87S9PCguQZH0jzxwF'),
      network_id: 4
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
