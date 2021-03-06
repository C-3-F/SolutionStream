import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import Routes from 'next-routes';

class RequestRow extends Component {
  state = {
    isApproving: false,
    isFinalizing: false,
    errorMessage: '',
    isAllowed: true
  };
  onApprove = async () => {
    this.setState({ isApproving: true });
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(this.props.id).send({ from: accounts[0] });
    this.setState({ isApproving: false });
  };

  onFinalize = async () => {
    this.setState({ isFinalizing: true });
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    console.log(this.props.manager);
    if (accounts[0] == this.props.manager) {
      await campaign.methods.finalizeRequest(this.props.id).send({ from: accounts[0] });
      this.setState({ isFinalizing: false });
    } else {
      this.setState({ isAllowed: false });
    }
    console.log(this.state.isAllowed);
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, contributers } = this.props;
    const readyToFinalize = request.approvalCount > contributers / 2;
    let button;
    if (this.state.isAllowed) {
      button = (
        <Button
          color="blue"
          basic
          onClick={this.onFinalize}
          loading={this.state.isFinalizing}
          disabled={this.state.isApproving}
        >
          Finalize
        </Button>
      );
    } else {
      console.log('rightpath');
      <Button color="red" basic disabled>
        You are not the manager
      </Button>;
    }

    return (
      <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
        <Cell>{id + 1}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount}/{contributers}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button
              color="green"
              basic
              onClick={this.onApprove}
              loading={this.state.isApproving}
              disabled={this.state.isFinalizing}
            >
              Approve
            </Button>
          )}
        </Cell>
        <Cell>{request.complete ? 'This request has been finalized' : button}</Cell>
      </Row>
    );
  }
}

export default RequestRow;
