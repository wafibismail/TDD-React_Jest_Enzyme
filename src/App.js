import React, { Component } from 'react';
import PersonList from './PersonList';

class App extends Component {
  state = { people: [] };
  render() {
    return (
      <div className="App">
        <PersonList people={this.state.people} />
      </div>
    );
  }
}

export default App;
