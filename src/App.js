import React, { Component } from 'react';
import io from 'socket.io-client';

class App extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const body = event.target.value;
    const code = event.keyCode || event.which;

    if (code === 13 && body) {
      const message = {
        from: 'me',
        body,
      };

      this.setState({ messages: [message, ...this.state.messages] });
      this.socket.emit('message', body);
      event.target.value = '';
    }
  }

  componentDidMount() {
    this.socket = io('/');
    this.socket.on('message', (message) =>
      this.setState({ messages: [message, ...this.state.messages] }),
    );
  }

  render() {
    const messages = this.state.messages.map((message, index) => (
      <li key={index}>
        <b>
          {message.from}: {message.body}
        </b>
      </li>
    ));

    return (
      <>
        <h1>React Chat</h1>
        <input
          type="text"
          placeholder="Insert a message"
          onKeyPress={this.handleSubmit}
        />
        {messages}
      </>
    );
  }
}

export default App;
