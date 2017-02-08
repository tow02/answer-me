import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
  click() {
    console.log(this.xxxxx.yyy)
  }
  render() {
    return (<div>
      <h1>
        Hello
      </h1>
      <button onClick={() => this.click()}>Error</button>
    </div>)
  }
}

ReactDOM.render(<Hello />, document.getElementById('hello'));
