import React from 'react';
import logo from './logo.svg';
import './App.css';

import { OverlayText } from './constants'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pupperUrl: null,
      pupperBreed: 'all'
    };
  }

  componentDidMount() {
    this.fetchPupper()
  }

  fetchPupper() {
    let endpoint;
    if (this.state.pupperBreed === 'all') {
      endpoint = 'https://dog.ceo/api/breeds/image/random'
    } else {
      endpoint = `https://dog.ceo/api/breed/${this.state.pupperBreed}/images/random`
    }
    this.makePupperRequest(endpoint).then(pupperUrl => {
      this.setState({ pupperUrl })
    })
  }

  async makePupperRequest(endpoint) {
    const pupperResponse = await fetch(endpoint)
    const pupperResponseBody = await pupperResponse.json();
    return pupperResponseBody.message
  }

  updatePupper(event) {
    this.setState({ pupperBreed: event.target.value })
  }

  render() {
    return (
      <div className="pupper-app">
        <div className="pupper-app-wrapper">
          <select onChange={this.updatePupper.bind(this)}>
            <option value="all">All Puppers</option>
            <option value="corgi">Corgi</option>
            <option value="retriever">Retriever</option>
            <option value="chihuahua">Chihuahua</option>
          </select>
          <button onClick={this.fetchPupper.bind(this)}>Fetch New Pupper</button>
          {this.renderOverlay()}
          <img src={this.state.pupperUrl || logo} className="billie-pupper" alt="logo" />
        </div>
      </div>
    );
  }

  renderOverlay() {
    const splitOverlay = OverlayText.split('')
    let overlayInColor = []
    for (let i = 0; i < splitOverlay.length; i++) {
      overlayInColor.push(
        <span key={i} className={`color-${i % 4}`}>{splitOverlay[i]}</span>
      )
    }
    return <p>{overlayInColor}</p >
  }
}

export default App;
