import web3 from './web3';
import CampaignFactory from './build/Factory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x851FDD4442f9DAB120b0B65CCBA4d91B66bd464E'
);

export default instance;
