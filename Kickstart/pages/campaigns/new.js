import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    description: '',
    errorMessage: '',
    isLoading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true, errorMessage: '' });
    try {
      if (this.state.description == '') {
        throw 'Please enter a description';
      }
      try {
        const accounts = await web3.eth.getAccounts();
        await factory.methods
          .createCampaign(this.state.minimumContribution, this.state.description)
          .send({ from: accounts[0] });
        Router.pushRoute('/');
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
    } catch (err) {
      this.setState({ errorMessage: err });
    }

    this.setState({ isLoading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="Wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event => this.setState({ minimumContribution: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
            />
          </Form.Field>
          <Message error header="Error:" content={this.state.errorMessage} />
          <Button loading={this.state.isLoading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
