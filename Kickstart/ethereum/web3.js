import Web3 from 'web3';

let web3;

if (typeof window != 'undefined' && typeof window.web3 != 'undefined') {
  //in browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  //we are on server or user doesn't have metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/uXb87S9PCguQZH0jzxwF'
  );
  web3 = new Web3(provider);
}

export default web3;
