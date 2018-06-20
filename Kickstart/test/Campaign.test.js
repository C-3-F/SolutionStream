const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/Factory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: 1000000 });

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: 1000000
  });

  [campaignAddress] = await factory.methods.getDeployedCamps().call();
  campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress);
});

describe('Campaigns', () => {
  it('deploys a factory & campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it('creator becomes manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it('allows contributions and marks as approvers', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '200'
    });
    const approverAddress = await campaign.methods.approvers(accounts[1]);
    assert(approverAddress);
  });

  it('has minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        value: '90',
        from: accounts[0]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('manager can create a request', async () => {
    await campaign.methods.createRequest('Test Request', '100', accounts[2]).send({
      from: accounts[0],
      gas: 1000000
    });
    const request = await campaign.methods.requests(0).call();
    assert.equal('Test Request', request.description);
  });

  it('can complete functions start to finish', async () => {
    let prevbalance = await web3.eth.getBalance(accounts[2]);
    prevbalance = web3.utils.fromWei(prevbalance, 'ether');
    prevbalance = parseFloat(prevbalance);
    console.log(prevbalance);

    await campaign.methods.contribute().send({
      from: accounts[1],
      value: web3.utils.toWei('10', 'ether')
    });
    await campaign.methods
      .createRequest('Buy Batteries', web3.utils.toWei('5', 'ether'), accounts[2])
      .send({
        from: accounts[0],
        gas: '1000000'
      });
    await campaign.methods.approveRequest(0).send({
      from: accounts[1],
      gas: '1000000'
    });
    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    });

    let balance = await web3.eth.getBalance(accounts[2]);
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > prevbalance);
  });
});
