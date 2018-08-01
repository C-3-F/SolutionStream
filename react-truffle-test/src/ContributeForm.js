import React, { Component } from 'react';
import { Form, Input, Message, Button, Label, Checkbox } from 'semantic-ui-react';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false,
    isSuccess: false,
    tokenMode: false
  };

  onSubmit = async event => {
    event.preventDefault();
    const web3 = this.props.web3;
    const contract = this.props.contract;

    this.setState({ loading: true, errorMessage: '', isSuccess: false });
    const value = this.state.tokenMode ? this.state.value : this.state.value;
    // console.log(this.props);
    // console.log(this.state);
    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      console.log(web3);
      await contract.sendTransaction({
        from: accounts[0],
        value: this.props.web3.utils.toWei(this.state.value, 'ether')
      });
      this.setState({ isSuccess: true });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false, value: '' });
  };

  render() {
    return this.state.tokenMode ? (
      <div>
        <Checkbox
          slider
          checked={this.state.tokenMode}
          onChange={() => this.setState({ tokenMode: !this.state.tokenMode })}
        />
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Buy Tokens</label>
            <Input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
              label="ETH"
              labelPosition="right"
            />
          </Form.Field>
          {!this.state.isSuccess ? (
            <Message error header="Error:" content={this.state.errorMessage} />
          ) : (
            <Message positive header="Success" content="" />
          )}

          {this.state.loading ? (
            <Button
              primary
              loading
              label={{
                as: 'div',
                basic: true,
                content: 'Writing to the Blockchain... This may take a moment',
                color: 'blue'
              }}
            />
          ) : (
            <Button primary>Purchase</Button>
          )}
        </Form>
      </div>
    ) : (
      <div>
        <Checkbox
          slider
          checked={this.state.tokenMode}
          onChange={() => this.setState({ tokenMode: !this.state.tokenMode })}
        />
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Buy Tokens</label>
            <Input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
              label="Tokens"
              labelPosition="right"
            />
          </Form.Field>
          {!this.state.isSuccess ? (
            <Message error header="Error:" content={this.state.errorMessage} />
          ) : (
            <Message positive header="Success" content="" />
          )}

          {this.state.loading ? (
            <Button
              primary
              loading
              label={{
                as: 'div',
                basic: true,
                content: 'Writing to the Blockchain... This may take a moment',
                color: 'blue'
              }}
            />
          ) : (
            <Button primary>Purchase</Button>
          )}
        </Form>
      </div>
    );
  }
}

export default ContributeForm;
