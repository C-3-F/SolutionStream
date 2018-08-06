import React, { Component } from 'react';
import { Form, Input, Message, Button, Label, Checkbox } from 'semantic-ui-react';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false,
    isSuccess: false,
    tokenMode: false,
    tokenAddress: ''
  };

  checkValue(value) {
    value = parseFloat(value);
    if (!value > 0) {
      throw { message: 'Please enter a value greater than 0' };
    }
  }

  onSubmit = async event => {
    event.preventDefault();
    const web3 = this.props.web3;
    const contract = this.props.contract;
    const tokenAddress = await contract.token();

    this.setState({ loading: true, errorMessage: '', isSuccess: false, tokenAddress });
    let value;

    this.state.tokenMode
      ? (value = this.state.value)
      : (value = (this.state.value / (await contract.rate())).toString());

    try {
      console.log(value);
      this.checkValue(value);
      const accounts = await web3.eth.getAccounts();

      await contract.sendTransaction({
        from: accounts[0],
        value: this.props.web3.utils.toWei(value, 'ether')
      });
      this.setState({ isSuccess: true });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false, value: '' });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Buy Tokens</label>
            <Input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
              labelPosition="right"
              actionPosition="left"
            >
              <Label>
                <Checkbox
                  slider
                  checked={this.state.tokenMode}
                  onChange={() => this.setState({ tokenMode: !this.state.tokenMode })}
                />
                <br />
                Unit
              </Label>

              <input />
              <Label>{this.state.tokenMode ? 'ETH' : 'Tokens'}</Label>
            </Input>
          </Form.Field>
          {!this.state.isSuccess ? (
            <Message error header="Error:" content={this.state.errorMessage} />
          ) : (
            <Message
              positive
              header="Success"
              content={`Token Contract Address: ${this.state.tokenAddress}`}
            />
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
