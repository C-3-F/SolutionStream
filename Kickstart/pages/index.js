import react, { Component } from 'react';
import factory from '../ethereum/factory.js';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCamps().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true
      };
    });
    return <Card.Group items={items} />;
  }

  // renderCampaigns() {
  //   let items = new Array();
  //   console.log('Creates array');
  //   this.props.campaigns.forEach(campaign => {
  //     console.log(campaign);
  //     console.log('');
  //     console.log(this.props.campaigns);
  //     items.push({
  //       header: campaign,
  //       description: (
  //         <Link route={`/campaigns/${campaign}`}>
  //           <a>View Campaign</a>
  //         </Link>
  //       ),
  //       meta: campaign.description,
  //       fluid: true
  //     });
  //     console.log('completed element');
  //   });
  //   return <Card.Group items={items} />;
  // }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Link route="/campaigns/new">
            <a>
              <Button floated="right" content="Create Campaign" icon="add circle" primary />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
