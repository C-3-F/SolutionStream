const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/Factory.json');

const provider = new HDWalletProvider(
  'melody adjust door gauge equip pledge taste decorate night dilemma lion vague',
  'https://rinkeby.infura.io/uXb87S9PCguQZH0jzxwF'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });
  console.log('Contract deployed to', result.options.address);
};
deploy();

//deployed to 0x851FDD4442f9DAB120b0B65CCBA4d91B66bd464E on rinkeby
