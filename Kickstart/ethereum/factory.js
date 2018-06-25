import web3 from './web3';
import CampaignFactory from './build/Factory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x848CB0Af79D5212E823e5d1F34C3B2E33468097b'
);

export default instance;
