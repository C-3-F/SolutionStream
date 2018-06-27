import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    const description = await campaign.methods.description().call();

    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      address: props.query.address,
      description: description
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestCount,
      approversCount,
      description
    } = this.props;

    console.log(description);
    const items = [
      {
        description: manager,
        header: 'Address of Manager',
        meta: 'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      },
      {
        description: description,
        header: 'Description',
        meta: 'A brief description of the campaign'
      },
      {
        description: minimumContribution,
        header: 'Minimum Contribution (wei)',
        meta: 'You must contribute this much way to be a contributer',
        style: { overflowWrap: 'break-word' }
      },
      {
        description: requestCount,
        header: 'Number of Requests',
        meta: 'A request tries to withdraw money from the campaign to use towards the product',
        style: { overflowWrap: 'break-word' }
      },
      {
        description: approversCount,
        header: 'Number of Contributers',
        meta: 'The number of people who have already donated to campaign',
        style: { overflowWrap: 'break-word' }
      },
      {
        description: web3.utils.fromWei(balance, 'ether'),
        header: 'Campaign Balance (ether)',
        meta: 'The amount of money availible to the campaign'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Details: </h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
